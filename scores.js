// Leaderboard for Ea-nasir's Copper Co.
// Vercel runs this file automatically at /api/scores.
//   GET  /api/scores           → the top 20 scores
//   POST /api/scores {name, silver} → saves a score, returns the top 20 and the new entry's rank
//
// Storage: an Upstash Redis database connected through the Vercel Marketplace.
// Vercel adds its address and password to the project as environment variables;
// this file reads either naming style. Nothing secret is written in this file.

const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const BOARD = "eanasir:leaderboard";
const TOP_N = 20;            // how many scores the game shows
const KEEP = 200;            // how many scores are stored
const MAX_SILVER = 75;       // highest score the rules allow (5 sales × 15 shekels)
const PER_MINUTE = 5;        // submissions allowed per visitor per minute

// Ratings are worked out here from the score, not taken from the browser,
// so a tampered request can't claim a rating it didn't earn.
const RATINGS = [
  { min: 40, name: "Merchant Prince of Ur" },
  { min: 33, name: "Shrewd Dealer" },
  { min: 25, name: "Honest Trader" },
  { min: 15, name: "Struggling Merchant" },
  { min: 0, name: "Literally Ea-nasir" }
];
const ratingFor = (silver) => RATINGS.find((r) => silver >= r.min).name;

// A short list of words not allowed in names. It won't catch everything;
// you can delete any entry from the database in Vercel → Storage if needed.
const BLOCKED = ["fuck", "shit", "cunt", "nigg", "fag", "bitch", "rape", "nazi", "whore", "slut", "dick", "cock", "pussy"];

async function redis(command) {
  const r = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command)
  });
  if (!r.ok) throw new Error("storage error " + r.status);
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

function cleanName(raw) {
  if (typeof raw !== "string") return null;
  const name = raw.normalize("NFKC").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 20);
  if (name.length < 1) return null;
  if (!/^[\p{L}\p{N} .,'’_\-!?&]+$/u.test(name)) return null;
  // Undo common letter swaps (sh!t, b1tch, a$$) before checking the blocked list.
  const swaps = { "!": "i", "1": "i", "|": "i", "3": "e", "0": "o", "4": "a", "@": "a", "$": "s", "5": "s", "7": "t", "+": "t" };
  const squashed = name.toLowerCase().replace(/[!1|30@4$57+]/g, (c) => swaps[c]).replace(/[^a-z]/g, "");
  if (BLOCKED.some((w) => squashed.includes(w))) return null;
  return name;
}

async function topScores() {
  const raw = await redis(["ZRANGE", BOARD, "0", String(TOP_N - 1), "REV"]);
  return (raw || []).map((m) => {
    try {
      const e = JSON.parse(m);
      return { id: e.id, name: e.name, silver: e.silver, rating: ratingFor(e.silver) };
    } catch {
      return null;
    }
  }).filter(Boolean);
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!URL || !TOKEN) {
    return res.status(503).json({ error: "The leaderboard database isn’t connected yet." });
  }
  try {
    if (req.method === "GET") {
      return res.status(200).json({ scores: await topScores() });
    }
    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Simple flood protection: a few submissions per visitor per minute.
    const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
    const limitKey = `eanasir:rate:${ip}`;
    const count = await redis(["INCR", limitKey]);
    if (count === 1) await redis(["EXPIRE", limitKey, "60"]);
    if (count > PER_MINUTE) return res.status(429).json({ error: "Too many scores at once. Try again in a minute." });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const name = cleanName(body.name);
    if (!name) return res.status(400).json({ error: "Please choose a different name (letters, numbers, and simple punctuation, up to 20 characters)." });
    const silver = Number(body.silver);
    if (!Number.isInteger(silver) || silver < 0 || silver > MAX_SILVER) {
      return res.status(400).json({ error: "That score isn’t possible in this game." });
    }

    const now = Date.now();
    const id = now.toString(36) + Math.random().toString(36).slice(2, 8);
    // Higher silver ranks first; for equal silver, the earlier score ranks first.
    const rankScore = silver + (1 - now / 1e13);
    await redis(["ZADD", BOARD, String(rankScore), JSON.stringify({ id, name, silver, t: now })]);
    await redis(["ZREMRANGEBYRANK", BOARD, "0", String(-(KEEP + 1))]);   // keep only the best KEEP
    const rank = await redis(["ZREVRANK", BOARD, JSON.stringify({ id, name, silver, t: now })]);

    return res.status(200).json({
      scores: await topScores(),
      entry: { id, name, silver, rating: ratingFor(silver), rank: rank === null ? null : rank + 1 }
    });
  } catch (err) {
    return res.status(500).json({ error: "The leaderboard is having trouble right now. Please try again later." });
  }
};
