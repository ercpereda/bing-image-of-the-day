import * as request from 'minimal-request-promise';

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
 * Gets the urls of the bing's images of the day.
 * @param {number} [n=1] - How many images to return.
 * @param {MKT} [mkt=en-US] - Tells which of the 8 markets Bing is available for you would like images from.
 * @param {number} [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
 * @param {string} [format=js] - Set the format in which the data will be return.
 * @returns {Promise.<Object, Error>} A promise that return the image data if resolved, or an Error if rejected
 */
export async function getImages(n = 1, mkt = MKT.enUS, idx = 0, format = 'js') {
  let res = await request.get(`http://www.bing.com/HPImageArchive.aspx?format=${format}&idx=${idx}&n=${n}&mkt=${mkt}`);

  return JSON.parse(res.body);
}
