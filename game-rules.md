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
- Customers 1–4 are invented characters picked from a small list. Customer 5 is always **Nanni**.
- Each customer has a secret **limit**: the most they will pay.
- **Limit = 4 + (reputation × 0.12) + luck**, where luck is a whole number from −2 to +2. The limit is rounded and kept between 1 and 25.
- The customer's limit does **not** depend on the ingot's quality, because they can't see it. That's the hidden-information part.

| Reputation | Typical limit |
| --- | --- |
| 100 | 14 to 18 |
| 60 (start) | 9 to 13 |
| 20 | 4 to 8 |
| 0 | 2 to 6 |

## Customer hints
Each customer card shows three lines:
- **About:** who they are and why they want copper (flavor only).
- **Purse:** a clue to their luck. Each customer has five purse lines, from broke (luck −2) to rich (luck +2). Example for Kuri the goat trader: "Three of his goats ran away last week" (−2) up to "He just sold his whole herd to the palace kitchens" (+2).
- **Trust:** a clue to your reputation's effect:
  - 85–100: you're known as the most honest dealer in Ur
  - 70–84: they've heard good things about your shop
  - 40–69: they don't know your reputation either way
  - 20–39: they've heard complaints about you
  - 0–19: they've seen the complaint tablets with your name on them

Together, purse and trust tell the player roughly where the secret limit sits, without giving the exact number.

## The offer: four possible outcomes
Checked in this order:

| Outcome | When | Silver | Reputation |
| --- | --- | --- | --- |
| **Walkout** | price > customer's limit | +0 | no change |
| **Returned** | bought, but price > 1.5 × fair price | +0 | drops by 3 × (price − fair), at most 30 |
| **Overcharged** | bought, price above fair but no more than 1.5 × fair | +price | drops by 3 × (price − fair), at most 30 |
| **Fair sale** | bought, price at or below fair | +price | +8 |

Returned and overcharged sales both send a complaint tablet before the next customer.

The highest price that sticks for each grade:

| Grade | Fair | Highest kept price | Returned at |
| --- | --- | --- | --- |
| Fine copper | 10 | 15 | 16 or more |
| Decent | 8 | 12 | 13 or more |
| Lumpy | 6 | 9 | 10 or more |
| Poor | 4 | 6 | 7 or more |
| Mostly rock | 2 | 3 | 4 or more |

- Make offer works once per customer. Pressing it again does nothing.
- Reputation starts at 60 and stays between 0 and 100.

**Why this is game theory:** overcharging is a one-time win, but every complaint lowers later customers' limits, so early greed can cost you the high-value sales that come later. The return rule caps how greedy any single sale can be. With typical luck, our simulation of every ingot order found:
- Always charging fair: **30** silver.
- Always charging the highest kept price: about **18** (big early prices get walkouts and drag reputation down).
- Overcharging the first four cheap ingots, then selling Fine copper: about **27**.
- Best mix (build trust first, overcharge wisely): **37–40**.

## Screens (states)

| State | What the player sees |
| --- | --- |
| Instructions | Title, goal, how-to steps, **Open the shop** |
| Offering | "Customer N of 5", customer name, about, purse and trust hints, ingot grade and fair price, price control, silver, reputation, **Make offer** |
| Reaction | "Sold!", "Sold… then returned!", or "They walked out," the price, the silver change, **Next customer** |
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
| 38 or more | Merchant Prince of Ur |
| 33–37 | Shrewd Dealer |
| 28–32 | Honest Trader |
| 20–27 | Struggling Merchant |
| under 20 | Literally Ea-nasir |

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
5. Sell "Mostly rock" for 3. → Sold, silver +3, complaint tablet, reputation −3.
6. Sell "Mostly rock" for 10 (if they accept). → Returned: silver +0, complaint tablet, reputation −24.
7. Sell any ingot at exactly its fair price. → No complaint; reputation rises by 8.
8. Press Make offer twice quickly. → Only one offer counts.
9. Finish all five customers. → Customer 5 is Nanni; the result shows a rating that matches the table, with the arrow on that rating in the full list.
10. Press Open a new shop. → Silver 0, reputation 60, Customer 1 of 5.
11. On a phone, set a price with − / + and make an offer. → Works without zooming or scrolling oddly.
