# Solana NFT Arbitrage Script

This is a super simple script created to compare Solana NFT collection data between HadeSwap and MagicEden in order to locate potential arbitrage opportunites.

With the rise of AMM's and MagicEden's instant sells (collection offers), there is more liquidity behind NFTs than there has been in the past. Pair that with Solana's incredibly low fees and there are now some fun arbitrage opportunites with NFTs :)

This app is by no means perfected and not meant to operate on its own. I used it as a learning experience for web crawling. Since HadeSwap does not expose any API endpoints, I had to scrape their site for the data I needed. Luckily MagicEden does have easily accessible APIs, so that part was much easier.

## TODO

There are a lot of improvements that could be made on this application if anyone wants to take it and run with it for automation purposes. I used this more as a proof of concept.

- [ ] Currently only working for 1 scenario: Hades offer > ME floor. Append to support for when ME Offer > Hades Floor
- [ ] Clean the return format so it gives more information. Currently just writes collection name to arb.json
- [ ] Add in buffer %s so you know exactly which collections are still worth trading even after fees
- [ ] Automate :). Give a wallet some funds and see if it can successfully trade on its own

## Running Locally

```bash
git clone https://github.com/Tcadle434/solana-nft-arbitrage.git
cd solana-nft-arbitrage
npm install
node src/arb.js
```

This will output several files just for my own sake when it comes to tracking data. The relevant collection names will appear in the `arb.json` file
