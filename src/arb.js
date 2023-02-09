const pupeeter = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

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
    console.error('There was a problem with the fetch operation:', error);
    return error;
  }
}

function createArbArray(data) {
  var finalMagicEdenArray = [];
  var finalArbArray = [];

  for (var i = 0; i < data.length; i++) {
    const name = data[i].name.replace(/ /g, '_');
    const bestOffer = data[i].bestOffer;

    getMagicEdenCollectionData(name.toLowerCase()).then((result) => {
      finalMagicEdenArray.push(result);
      fs.writeFileSync(
        'magic.json',
        JSON.stringify(finalMagicEdenArray, null, 1)
      );

      const fp = result.floorPrice / 1000000000;

      if (
        bestOffer > fp &&
        result.floorPrice > 0 &&
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
