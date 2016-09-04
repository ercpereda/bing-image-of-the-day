import request from 'request';
import * as requestPromise from 'minimal-request-promise';
import * as fs from 'fs';

/**
 * Bing Markets
 * @enum {string}
 */
export const MKT = {
  enUS: 'en-US',
  zhCN: 'zh-CN',
  jaJP: 'ja-JP',
  enAU: 'en-AU',
  enUK: 'en-UK',
  deDE: 'de-DE',
  enNZ: 'en-NZ',
  enCA: 'en-CA'
};

/**
 * Gets the raw object returned by bing's images of the day service.
 * @param {number} [n=1] - How many images to return.
 * @param {MKT} [mkt=en-US] - Tells which of the 8 markets Bing is available for you would like images from.
 * @param {number} [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
 * @param {string} [format=js] - Set the format in which the data will be return.
 * @returns {Promise.<Object, Error>} A promise that return the image data if resolved, or an Error if rejected
 */
export async function getRaw(n = 1, mkt = MKT.enUS, idx = 0, format = 'js') {
  const res = await requestPromise.get(`http://www.bing.com/HPImageArchive.aspx?format=${format}&idx=${idx}&n=${n}&mkt=${mkt}`);

  return JSON.parse(res.body);
}

/**
 * Gets the urls of the bing's images of the day service.
 * @param {number} [n=1] - How many images to return.
 * @param {MKT} [mkt=en-US] - Tells which of the 8 markets Bing is available for you would like images from.
 * @param {number} [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
 * @param {string} [format=js] - Set the format in which the data will be return.
 * @returns {Promise.<Object, Error>} A promise that return the image's url if resolved, or an Error if rejected
 */
export async function getUrls(n = 1, mkt = MKT.enUs, idx = 0, format = 'js') {
  const res = await getRaw(n, mkt, idx, format);

  return res.images.map(i => `https://www.bing.com${i.url}`);
}

/**
 * Download the images in the specified location.
 * @param {string} [loc=.] - Location in which the images will be saved.
 * @param {number} [n=1] - How many images to return.
 * @param {MKT} [mkt=en-US] - Tells which of the 8 markets Bing is available for you would like images from.
 * @param {number} [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
 * @param {string} [format=js] - Set the format in which the data will be return.
 * @returns {Array<Promise.<Object, Error>>} An array of promises for each image downloaded.
 */
export async function download(
    loc = '.', n = 1, mkt = MKT.enUS, idx = 0, format = 'js') {

  loc = loc + (loc[loc.lenght - 1] == '/' ? '' : '/');

  const urls = await getUrls(n, mkt, idx, format);

  const promises = urls.map(url => {
    const fileName = url.split('/').slice(-1)[0];

    return new Promise((resolve, reject) => {
      request(url).
        pipe(fs.createWriteStream(loc + fileName)).
        on('close', () =>  resolve(true)).
        on('error', err => reject(err));
    });
  });

  return await Promise.all(promises);
}
