const pupeeter = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
// const { mapping } = require('./mapping.js');

const mapping = [
  { key: 'cyber_samurai', value: 'cyber_samurai_gen2' },
  { key: 'immortals', value: 'immortals_nft' },
  { key: 'abc', value: 'abc_abracadabra' },
  { key: 'sharx_by_sharky.fi', value: 'sharx' },
  {
    key: 'liberty_square:_the_sinister_squirrel_syndicate',
    value: 'liberty_square',
  },
  { key: 'shremps', value: 'shremp' },
  { key: 'sol_city:_gen_2', value: 'sol_city_gen_2' },
  { key: 'bubblegoose_baller', value: 'bubblegoose_ballers' },
  { key: 'ls_hallowed', value: 'ls_the_hallowed' },
  { key: 'mara', value: 'mara_nft' },
  { key: 'froots', value: 'frootsnft' },
  { key: 'sol_decoder', value: 'soldecoder' },
  { key: 'the_skull_collective', value: 'the_skull_collective_ccc' },
  { key: 'bonkz_-_revealed', value: 'bonkznft' },
  { key: 'meerkat_millionaires', value: 'meerkat_millionaires_country_club' },
  { key: 'degenerate_drop_bears', value: 'degenerate_ape_kindergarten' },
  { key: 'dazed_ducks', value: 'dazedducks_metagalactic_club' },
  { key: 'dust_city', value: 'dustcity' },
  { key: 'just_worms', value: 'justw0rms' },
  { key: 'jelly_rascals', value: 'rascals' },
  { key: 'chikara_chimps', value: 'chikarachimps' },
  { key: 'ghostkiddao', value: 'ghost_kid_dao' },
  { key: 'marshies', value: 'marshiesnft_' },
  { key: 'bohemia', value: 'bohemia_' },
  { key: 'the_fox_club', value: 'thefoxclub' },
  { key: 'chimpos', value: 'chimpos_nft' },
  { key: 'geobots', value: 'geo_gang' },
  { key: 'nerdy_ape_hub', value: 'nah' },
  { key: 'unchained_nft', value: 'unchained' },
  { key: 'bonk_boxes', value: 'bonk_boxes_' },
  { key: 'forest_gemmy', value: 'forest_gemmys' },
  { key: 'coral_tribe', value: 'crypto_coral_tribe' },
  { key: 'honeyland_passes', value: 'honeylandpass' },
  { key: 'infected_rascals', value: 'infected_rascals_' },
  { key: 'simmple_labs', value: 'simmple_labs_nft' },
  { key: 'ovols', value: 'elixir_ovols' },
  { key: 'catalina_whale_mixer', value: 'the_catalina_whale_mixer' },
  { key: 'deadcats', value: 'deadcats_' },
  { key: 'smyths', value: 'blocksmith_labs' },
  { key: 'solsteads', value: 'solsteads_surreal_estate' },
  { key: 'pilots', value: 'taiyopilots' },
  { key: 'the_pixel_dudes', value: 'pixel_dude' },
  { key: 'rentii_rebel', value: 'rentii' },
  { key: 'claynosaurz:_clay', value: 'clay' },
  { key: 'bvdcats', value: 'bvdcat' },
  { key: 'vandals', value: 'vandal_city' },
  { key: 'mischievous_maxis', value: 'mischievousmaxis' },
  { key: 'galactic_gecko_space_garage', value: 'galactic_geckos' },
  { key: 'degen_fat_cats', value: 'degenfatcats' },
  { key: 'solana_bonk_business', value: 'doge_' },
  { key: 'bitmon_trainers', value: 'bitmon_adventures' },
  { key: 'creature_chronicles:_atrivians', value: 'atrivians' },
  { key: 'wade_friends_&_family', value: 'wade' },
  { key: 'communi3:_mad_scientists', value: 'communi3' },
  { key: 'rare_pepe_dao', value: 'rare_pepe' },
  { key: 'claynosaurz:_claymaker', value: 'claymaker' },
  { key: 'alpha_gardeners', value: 'alpha_gardener' },
  { key: 'great_goats', value: 'great__goats' },
  { key: 'taiyo_oil', value: 'taiyooil' },
  { key: 'pop!', value: 'pop_nft' },
  { key: 'the_remnants', value: 'the_remnants_' },
  { key: 'simpl3r:_bounty_hunters', value: 'simpl3r' },
  { key: 'y00ts:_mint_t00bs', value: 't00bs' },
  { key: 'acid_scientists', value: 'acidscientists' },
  { key: 'hooman', value: 'hooman_nft' },
  { key: 'sol_chicks', value: 'solchicks' },
  { key: "the_new_explorer's_club", value: 'the_new_explorers_club' },
  { key: 'reptilian_renegade', value: 'lizards' },
  { key: 'solana_bonk_business', value: 'bonkz' },
  { key: 'degendao', value: 'thedegendao' },
];

async function getMagicEdenCollectionData(collection) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('There was a problem with the fetch operation:', error);
    return error;
  }
}

function createArbArray(data) {
  var finalMagicEdenArray = [];
  var finalArbArray = [];

  for (var i = 0; i < data.length; i++) {
    let name = data[i].name.replace(/ /g, '_').toLowerCase();
    // name is a part of the mapping array, then replace name with the proper value
    if (mapping.some((item) => item.key === name)) {
      name = mapping.find((item) => item.key === name).value;
    }

    const bestOffer = data[i].bestOffer;

    getMagicEdenCollectionData(name).then((result) => {
      finalMagicEdenArray.push(result);
      fs.writeFileSync(
        'magic.json',
        JSON.stringify(finalMagicEdenArray, null, 1)
      );

      const fp = result.floorPrice / 1000000000;

      if (
        bestOffer / fp - 1 >= 0.015 &&
        bestOffer > 0.5 &&
        result.floorPrice > 0.5 &&
        result.floorPrice != null
      ) {
        console.log('bestOffer > floorPrice on collection: ', name);
        finalArbArray.push(name);
        fs.writeFileSync('arb.json', JSON.stringify(finalArbArray, null, 1));
      }
    });
  }
}

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const finalObjArray = [];
(async () => {
  const browser = await pupeeter.launch({});
  const page = await browser.newPage();
  await page.goto('https://beta.hadeswap.com/collections', {
    timeout: 15 * 1000,
    waitUntil: ['domcontentloaded'],
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'example.png' });

  const pageData = await page.evaluate(() => {
    return {
      html: document.documentElement.innerHTML,
    };
  });

  const $ = cheerio.load(pageData.html);
  const nameElement = $('.ant-table-cell');

  const nameData = nameElement.toArray().map((nameElement) => {
    return {
      name: $(nameElement).text(),
    };
  });

  const chunkedData = chunkArray(nameData, 5);

  for (var k = 1; k < chunkedData.length; k++) {
    var name = chunkedData[k][0].name;
    var listings = chunkedData[k][1].name;
    var floorPrice = chunkedData[k][2].name;
    var bestOffer = chunkedData[k][3].name;
    var offerTVL = chunkedData[k][4].name;

    const obj = {};
    obj.name = name;
    obj.listings = listings;
    obj.floorPrice = floorPrice;
    obj.bestOffer = bestOffer;
    obj.offerTVL = offerTVL;
    finalObjArray.push(obj);
  }

  fs.writeFileSync('data.json', JSON.stringify(finalObjArray, null, 1));
  createArbArray(finalObjArray);

  await browser.close();
})();

// (async () => {
//   await getMagicEdenCollectionData('degods').then((result) => {
//     console.log(result);
//   });
// })();
