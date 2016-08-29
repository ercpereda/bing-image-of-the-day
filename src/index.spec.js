import {expect} from 'chai';
import lib from './index';

describe('bing-image-of-the-day', () => {
  it('async test should be work', async function () {
    var testPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('Hello World!');
      }, 200);
    });

    var result = await testPromise;

    expect(result).to.equal('Hello World!');
  });
});
