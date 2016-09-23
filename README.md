# bing-image-of-the-day

[![travis build](https://img.shields.io/travis/ercpereda/bing-image-of-the-day.svg?style=flat-square)](https://travis-ci.org/ercpereda/bing-image-of-the-day/)
[![version](https://img.shields.io/npm/v/bing-image-of-the-day.svg?style=flat-square)](http://npm.im/bing-image-of-the-day)
[![downloads](https://img.shields.io/npm/dt/bing-image-of-the-day.svg?style=flat-square)](http://npm-stat.com/charts.html?package=bing-image-of-the-day)
[![MIT license](https://img.shields.io/npm/l/bing-image-of-the-day.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Gets the urls from the bing&#39;s images of the day

## Install
```bash
$ npm install bing-image-of-the-day
```

## Example

```js
var bingImg = require('bing-image-of-the-day');

// gets the raw object returned by the bing's image of the day service
bingImg.getRaw(
  1,                // [n=1] - How many images to return.
  bingImg.MKT.enUS, // [mkt='en-US'] - Tells which of the 8 markets Bing is available for you would like images from.
  0,                // [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
  'js'              // [format='js'] - Set the format in which the data will be return.
  ).
  then(res => console.log(res)).
  catch(err => console.log(err));

// gets an array with the image's urls.
bingImg.getUrls(
  1,                // [n=1] - How many images to return.
  bingImg.MKT.enUS, // [mkt='en-US'] - Tells which of the 8 markets Bing is available for you would like images from.
  0,                // [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
  'js'              // [format='js'] - Set the format in which the data will be return.
  ).
  then(res => console.log(res)).
  catch(err => console.log(err));

// download the images
bingImg.download(
  '.',              // [log='.'] - Location in which the images will be saved.
  1,                // [n=1] - How many images to return.
  bingImg.MKT.enUS, // [mkt='en-US'] - Tells which of the 8 markets Bing is available for you would like images from.
  0,                // [idx=0] - Tells where you want start from. 0 would start at the current day, 1 the previous day, etc.
  'js'              // [format='js'] - Set the format in which the data will be return.
  ).
  then(res => console.log(res)).
  catch(err => console.log(err));
```
