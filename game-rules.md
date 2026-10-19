# Game rules: Ea-nasir's Copper Co. (first version)

## Goal (shown to the player)
Make as much silver as you can from five copper ingots.

## How to play (shown on the instructions card)
1. Look at your ingot. You know its true quality; your customer doesn't.
2. Pick a price from 1 to 25 shekels and press **Make offer**. You get one offer per customer.
3. If the price is within what they'll pay, they buy. Too high and they walk out.
4. Charge more than the fair price and a complaint tablet follows: your reputation drops and later customers pay less.
5. Charge more than 50% above the fair price and the customer returns the ingot. You keep no silver.

## Ingots
- Each round has exactly five ingots, one of each grade, in a shuffled order.

| Grade | Fair price |
| --- | --- |
| Fine copper | 10 |
| Decent | 8 |
| Lumpy | 6 |
| Poor | 4 |
| Mostly rock | 2 |

The player sees the grade and fair price. The customer does not.

## Customers
- Customers 1–4 are picked from six invented characters. Customer 5 is always **Nanni**.
- Each character has **three possible visits**. A visit is chosen at random and sets two hidden numbers:
  - **Wealth** (−2 to +2): how much silver they carry.
  - **Knows copper** (0 to 3): how likely they are to notice an overcharge.
- Neither number is shown. The **description** hints at both, through the customer's situation, the copper's intended use, and who they're buying it for. Examples:
  - Kuri the goat trader, rich and clueless: "Just sold his whole herd to the palace kitchens… He's never owned anything metal before."
  - Ubar-Sin the scribe, expert eyes waiting: "Buying a gift for his father, a retired coppersmith who will inspect every inch of it."
- Nanni always knows copper well (2 or 3).

**Limit = 4 + (reputation × 0.12) + wealth + luck**, where luck is a hidden whole number from −1 to +1. The limit is rounded and kept between 1 and 25. Quality doesn't affect the limit; the customer can't see it.

## Noticing an overcharge
| Knows copper | Chance to notice | Chance if price is over 1.5 × fair |
| --- | --- | --- |
| 0 – can't tell copper from rock | 10% | 35% |
| 1 – knows a little | 40% | 65% |
| 2 – knows it well | 75% | 100% |
| 3 – expert (or someone expert will check) | 100% | 100% |

The roll is made in advance for each customer, so `?seed=` games repeat exactly.

## The offer: five possible outcomes
Checked in this order:

| Outcome | When | Silver | Reputation |
| --- | --- | --- | --- |
| **Walkout** | price > customer's limit | +0 | no change |
| **Fair sale** | price at or below fair | +price | +8 |
| **Fooled** | overcharged, but they didn't notice | +price | +8 (they think it was fair) |
| **Returned** | noticed, and price > 1.5 × fair | +0 | drops by 3 × (price − fair), at most 30 |
| **Overcharged** | noticed, price above fair but no more than 1.5 × fair | +price | drops by 3 × (price − fair), at most 30 |

Returned and overcharged sales send a complaint tablet before the next customer. A fooled customer sends nothing.

- Make offer works once per customer. Pressing it again does nothing.
- Reputation starts at 60 and stays between 0 and 100.

**Why this is game theory:** each sale is an ultimatum (one offer, take it or leave it) under hidden information on both sides. You know the copper's quality; the customer knows their own purse and eye for metal; each side only has clues. Overcharging someone who notices costs reputation, and lower reputation lowers every later customer's limit. Simulated averages over 20,000 rounds:
- Always charge fair: **about 30** silver.
- Always charge 1.5 × fair: **about 23**.
- Charge as much as each customer can afford: **about 18**.
- Read the descriptions; overcharge only those unlikely to notice: **about 35**, sometimes over 50.

## Screens (states)

| State | What the player sees |
| --- | --- |
| Instructions | Title, goal, how-to steps, **Open the shop** |
| Offering | "Customer N of 5", customer portrait, name and description (with hidden hints), Ea-nasir's portrait, ingot grade and fair price, price control, silver, reputation, **Make offer** |
| Reaction | Customer portrait with a matching expression; "Sold!", "Sold… then returned!", or "They walked out," the price, the silver change, **Next customer** |
| Complaint | A clay tablet with the complaint and the reputation drop, **Continue** |
| Result | Merchant rating, the full list of ratings with an arrow at the player’s, total silver, final reputation (plus any last complaint or return), **Open a new shop** |

## What happens when

| Player does… | In state… | Result |
| --- | --- | --- |
| Opens the page | — | Instructions; nothing else happens |
| Presses Open the shop | Instructions | Customer 1 of 5 appears |
| Changes the price | Offering | Shown price changes; nothing else happens |
| Presses Make offer | Offering | Reaction screen; silver and reputation update |
| Presses Next customer after a fair sale or walkout | Reaction | Next customer, or Result after customer 5 |
| Presses Next customer after an overcharge or return | Reaction | Complaint tablet (or Result, with the complaint shown, after customer 5) |
| Presses Continue | Complaint | Next customer |
| Presses Open a new shop | Result | Fresh round: silver 0, reputation 60, new shuffle, Customer 1 of 5 (no instructions) |

## Merchant rating (result screen)
Based on silver only. Final reputation is shown for interest.

The result screen lists all five ratings from best to worst, with an arrow (▶) and highlight on the player's rating.

| Total silver | Rating |
| --- | --- |
| 42 or more | Merchant Prince of Ur |
| 35–41 | Shrewd Dealer |
| 28–34 | Honest Trader |
| 20–27 | Struggling Merchant |
| under 20 | Literally Ea-nasir |

The result screen lists all five ratings from best to worst, with an arrow (▶) and highlight on the player's rating.

## Reset between rounds
- **Reset:** silver to 0, reputation to 60, ingot order, customers, any pending complaint.
- **Kept:** nothing (no saved scores).

## Controls
- **Price:** a slider plus − and + buttons, from 1 to 25. It starts at the ingot's fair price.
- **Laptop:** Enter = Make offer, Next customer, or Continue (whichever is showing). Arrow keys move the slider when it's selected.
- **Phone:** tap the − / + buttons, the slider, and the large buttons.
- Hidden test option: adding `?seed=1` to the address gives the same customers, ingots, and luck every time.

## Partner test cases
Mark each one **Passed**, **Failed**, or **Not tested**.

1. Open the game and wait. → Only the instructions show.
2. Press Open the shop. → "Customer 1 of 5," silver 0, reputation 60.
3. Offer 1 shekel. → Sold; silver rises by exactly 1; no complaint.
4. Offer 25 shekels. → They walk out; silver and reputation unchanged.
5. Overcharge a customer whose description says they're an expert (or that an expert will check). → Complaint tablet; reputation drops.
6. Overcharge a clueless customer (for example, "can't tell copper from bronze") several times across rounds. → Usually "none the wiser" with no tablet; occasionally they notice.
7. Sell any ingot at exactly its fair price. → No complaint; reputation rises by 8.
8. Press Make offer twice quickly. → Only one offer counts.
9. Finish all five customers. → Customer 5 is Nanni; the result shows a rating that matches the table, with the arrow on that rating in the full list.
10. Press Open a new shop. → Silver 0, reputation 60, Customer 1 of 5.
11. On a phone, set a price with − / + and make an offer. → Works without zooming or scrolling oddly.

## Portraits
Ea-nasir and every customer have simple drawn portraits in a style inspired by Mesopotamian statues (large eyes, joined brows, curled beards). No picture of Ea-nasir survives; all portraits are imagined. Customer expressions change after each offer: happy, suspicious, angry, or annoyed.
