# Game rules: Ea-nasir's Copper Co. (version 3: negotiation)

## Goal (shown to the player)
Make as much silver as you can. Name your copper, haggle over the price, and decide which ingot actually goes in the customer's sack.

## How to play (shown on the instructions card)
1. You have five ingots in stock, one of each grade. Five customers will visit.
2. Tell the customer which grade you're selling and name your price.
3. They accept, make one counter-offer, or walk out if your price insults them. If they counter, you accept or refuse.
4. Once a price is agreed, choose which ingot from your stock to hand over. It doesn't have to be the one you promised.
5. The customer inspects it. Someone who knows copper may spot the swap. Read each description for clues about their purse and their eye for copper.

## Stock
- Starts with five ingots: Fine copper (fair 10), Decent (8), Lumpy (6), Poor (4), Mostly rock (2).
- Each sale removes the ingot you hand over. A returned ingot goes back into stock.
- Each customer buys at most one ingot, so you never run out; unsold ingots are listed on the result screen.

## Customers
Unchanged from version 2: four of six invented characters plus Nanni. Each has three possible visits, setting hidden **wealth** (−2 to +2) and **knows copper** (0 to 3). The description hints at both.

## Step 1: Ea-nasir's offer
- Choose a **claimed grade** (any of the five, even one you don't have in stock) and an **asking price** from 1 to 25.
- The price starts at the claimed grade's fair price.

## Step 2: the customer responds
The customer believes your claim. Their hidden **most they'll pay**:

**Max = fair price of the claimed grade × (0.7 + reputation × 0.005) + wealth + luck**

(luck is −1 to +1; the result is rounded and kept between 1 and 25). At the starting reputation of 60 the multiplier is 1.0; at 100 it's 1.2; at 0 it's 0.7.

| Asking price | Customer response |
| --- | --- |
| At or below max | **Accepts** at your price |
| Above max, but no more than 1.5 × max (rounded up) | **Counters** at 90% of max (rounded, at least 1) |
| More than 1.5 × max | **Walks out**, insulted |

## Step 3: Ea-nasir responds to a counter
**Accept** the counter (deal at their price) or **Refuse** (no sale; reputation unchanged).

## Step 4: delivery
Choose which ingot from stock to hand over. The screen shows the grade you promised.

## Step 5: inspection
- **Honest or better** (delivered grade is the one promised or higher): customer is happy. Reputation **+8**.
- **Swapped for worse:** the customer may notice.

| Knows copper | Chance to notice a 1-grade swap |
| --- | --- |
| 0 – can't tell copper from rock | 10% |
| 1 – knows a little | 40% |
| 2 – knows it well | 75% |
| 3 – expert (or an expert will check) | 100% |

Each extra grade of difference adds **+15%**. (Promising Fine and delivering Mostly rock is a 4-grade swap.)

| Swap result | Silver | Reputation | Tablet |
| --- | --- | --- | --- |
| Not noticed | keep price | +8 | none |
| Noticed, price ≤ 1.5 × fair of the ingot delivered | keep price | drops by 3 × (price − delivered fair), at least 3, at most 30 | complaint |
| Noticed, price > 1.5 × fair of the ingot delivered | +0, ingot returns to stock | same drop | complaint ("I'm returning this") |

The notice roll is made in advance for each customer, so `?seed=` games repeat exactly.

**Why this is game theory:** a two-move bargaining game (offer, counter, accept or refuse) layered on hidden information on both sides. You know the real quality; the customer knows their own purse and eye for copper. Your claim is a signal they can't verify until it's too late. Lying is a gamble whose odds you estimate from the description, and every caught lie lowers what later customers will pay. Simulated averages over 20,000 rounds:
- Honest, fair prices: **about 27**
- Honest, pushing prices: **about 28**
- Always lie: **about 9**
- Lie only to customers unlikely to notice: **about 31**, sometimes over 50

## Merchant rating (silver only)
| Total silver | Rating |
| --- | --- |
| 40 or more | Merchant Prince of Ur |
| 33–39 | Shrewd Dealer |
| 25–32 | Honest Trader |
| 15–24 | Struggling Merchant |
| under 15 | Literally Ea-nasir |

The result screen lists all five with an arrow on the player's rating.

## Partner test cases
1. Open the game and wait. → Only the instructions show.
2. Claim the grade you'll deliver at its fair price, then deliver it. → Accepted (usually); no tablet; reputation +8.
3. Ask 25 for "Mostly rock." → The customer walks out; nothing changes.
4. Ask a little above what seems likely. → A counter-offer appears; Accept makes a deal at their price; Refuse ends with no sale.
5. Promise Fine, deliver Mostly rock to an expert (for example, "a retired coppersmith will inspect it"). → Noticed; returned or complaint; reputation drops.
6. Promise Decent, deliver Lumpy to a clueless customer. → Usually "none the wiser"; occasionally caught.
7. Get an ingot returned. → It appears back in your stock for the next customer.
8. Double-click Make offer, Accept, or an ingot. → Each counts only once, and the double-click never presses the button that appears next.
9. Finish five customers. → Nanni is last; the rating matches the table with the arrow on it.
10. Open a new shop. → Stock back to five, silver 0, reputation 60.

## Controls
- Claimed grade: five buttons. Price: slider plus − / + (1 to 25), starting at the claimed grade's fair price.
- Enter presses the main button (Make offer, Choose the ingot, Next customer, Continue, Open the shop). Two-way choices (Accept or Refuse, which ingot) need a click or tap.
- Buttons ignore clicks for 0.3 seconds after a screen changes, so a double-click can't skip a screen.
- Hidden test option: `?seed=1` repeats the same customers, visits, luck, and notice rolls.

## Portraits
Ea-nasir and every customer have simple drawn portraits inspired by Mesopotamian statues. No picture of Ea-nasir survives; all portraits are imagined. Customer expressions change with each response and inspection.

## Leaderboard (version 5)
- After the result, the player can enter a name (1–20 characters: letters, numbers, spaces, and simple punctuation) and submit their score once per round. Enter in the name box submits.
- The leaderboard shows the top 20 scores from everyone, ranked by silver (ties: the earlier score ranks higher), with each player's name, silver, and merchant rating. The player's own new entry is highlighted with ▶.
- The start screen has a **See the leaderboard** button.
- Names are public. The game suggests a first name or nickname.

**How it works:** the game sends scores to `api/scores.js`, a small server function Vercel runs automatically. Scores are stored in an Upstash Redis database connected through the Vercel Marketplace. The server keeps the best 200.

**Protections (on the server, not just in the browser):**
- The rating is calculated from the score on the server.
- Scores above 75 (the most the rules allow) are rejected.
- Names with code-like characters, or matching a short list of offensive words (including common letter swaps like "sh!t"), are rejected. Names are always displayed as plain text.
- Each visitor can submit at most 5 scores per minute.

**Known limit:** because the game runs in the player's browser, a determined person could send a fake score up to 75 without playing. That's normal for simple browser-game leaderboards. Entries can be deleted from the database in Vercel if needed.

**Leaderboard test cases**
1. Opened as a file on your computer: the leaderboard says it only works on the published site.
2. On the live site, submit a name. → "You're #N on the leaderboard!" and your row is highlighted.
3. Press Enter in the name box with it empty. → "Type a name first."
4. Try to submit twice. → Only one entry is saved.
5. Open the site on another device. → Your score appears there too.
