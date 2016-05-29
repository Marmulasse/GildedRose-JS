var chai = require('chai');
var expect = chai.expect;
var GilderRose = require('../src/gilded_rose.js')["default"].GildedRose;
var items = GilderRose.items;

describe("Gilded Rose", function() {

  it("should do something", function() {
    GilderRose.updateQuality();
    console.log(items);
  });

});
