# Game brief: Ea-nasir's Copper Co. (first version)

## Concept
You are Ea-nasir, a copper merchant in ancient Ur. Your goal: make as much silver as possible from five ingots of very questionable quality. Some customers know copper well and some can't tell it from a rock. Overcharge someone who doesn't notice and you profit; overcharge someone who does and complaint tablets wreck your reputation, or they return the ingot for nothing.

## Fact and fiction
- **Real history:** a merchant named Ea-nasir lived in Ur around 1750 BC. A clay tablet survives in which a customer, Nanni, complains about poor-quality copper ingots and rude treatment of his messenger.
- **Fiction:** everything in the game (other customers, prices, ingot grades, complaint wording) is invented for fun. Complaint tablets are written in our own words, not copied from any translation.

## Player
Anyone who enjoys the meme. A round takes about two minutes.

## Main action
For each customer, look at your ingot's true quality, then choose a price (1 to 25 shekels of silver) and press **Make offer**.

## A round
- Instructions show first. Nothing happens until **Open the shop** is pressed.
- Five customers arrive one at a time ("Customer 1 of 5"). The fifth is always Nanni.
- **You** see the ingot's true grade and its fair price. **The customer** only sees your pitch.
- Each customer has a secret limit (the most they'll pay), based on their wealth and your **reputation**, and a hidden **eye for copper**. Their description hints at both through who they are, what the copper is for, and who they're buying it for.
- Ea-nasir and every customer have an imagined portrait (no real picture of Ea-nasir survives).
- **Price at or below their limit:** "Sold!" You gain that much silver.
- **Price above their limit:** they walk out. No silver.
- **Fair sale** (at or below fair price): reputation rises a little.
- **Overcharging, not noticed:** they leave happy; you keep the silver.
- **Overcharging, noticed:** you keep the silver, but a complaint tablet arrives and reputation drops.
- **Noticed, and more than 50% above fair price:** the customer returns the ingot. No silver, and a complaint tablet.

## Grades and fair prices (starting values, adjustable)
| Grade | Fair price |
| --- | --- |
| Fine copper | 10 |
| Decent | 8 |
| Lumpy | 6 |
| Poor | 4 |
| Mostly rock | 2 |

## Scoring and result
- Score: total shekels of silver.
- Final **merchant rating** is based on silver alone, from "Merchant Prince of Ur" down to "Literally Ea-nasir."
- A complaint from the last sale still arrives on the result screen.

## Restart
**Open a new shop** resets silver, reputation, and customers, and skips the instructions.

## Controls
- Laptop: price buttons or slider, Enter to make an offer.
- Phone: tap the price controls and **Make offer**.

## Not in the first version
Real money, accounts, AI-written customers, online leaderboards, sound, animation beyond simple changes, more than five customers.

## Five checks that prove it works
1. Nothing happens until Open the shop is pressed, then "Customer 1 of 5" appears.
2. An accepted offer adds exactly that price to your silver.
3. A rejected offer leaves silver unchanged, and the next customer arrives.
4. Overcharging brings a complaint tablet and lowers reputation; charging more than 50% over fair price returns the ingot for 0 silver; a fair sale does neither.
5. After customer 5, the rating matches total silver, and Open a new shop resets everything.

## Status
Brief and rules agreed (goal: most silver; return rule added). Not built yet.
