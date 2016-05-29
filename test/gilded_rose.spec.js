"use strict";
var chai = require('chai');
var expect = chai.expect;
var gilded_rose_1 = require("../src/gilded_rose");
describe("Gilded Rose", function () {
    var items;
    beforeEach('', function () {
        items = [];
        items.push(new gilded_rose_1.Item('+5 Dexterity Vest', 20, 10));
        items.push(new gilded_rose_1.Item('Aged Brie', 0, 2));
        items.push(new gilded_rose_1.Item('Elixir of the Mongoose', 7, 5));
        items.push(new gilded_rose_1.Item('Sulfuras, Hand of Ragnaros', 80, 0));
        items.push(new gilded_rose_1.Item('Back Stage Pass', 20, 15));
        items.push(new gilded_rose_1.Item('Conjured Mana Cake', 6, 3));
    });
    it("should update quality of all items once", function () {
        var result = gilded_rose_1.Shop.updateQuality(items);
        expect(ItemHelper.toSimpleString(result)).to.equal('Item { name: \'+5 Dexterity Vest\', sell_in: 9, quality: 19 },' +
            'Item { name: \'Aged Brie\', sell_in: 1, quality: 1 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 4, quality: 6 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 14, quality: 21 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 2, quality: 5 }');
    });
    it("should update quality of all items twice", function () {
        var result = gilded_rose_1.Shop.updateQuality(items);
        result = gilded_rose_1.Shop.updateQuality(result);
        expect(ItemHelper.toSimpleString(result)).to.equal('Item { name: \'+5 Dexterity Vest\', sell_in: 8, quality: 18 },' +
            'Item { name: \'Aged Brie\', sell_in: 0, quality: 2 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 3, quality: 5 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 13, quality: 22 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 1, quality: 4 }');
    });
    it("should update quality of all items ten times", function () {
        var result = gilded_rose_1.Shop.updateQuality(items);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        result = gilded_rose_1.Shop.updateQuality(result);
        expect(ItemHelper.toSimpleString(result)).to.equal('Item { name: \'+5 Dexterity Vest\', sell_in: 0, quality: 10 },' +
            'Item { name: \'Aged Brie\', sell_in: -8, quality: 18 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: -5, quality: 0 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 5, quality: 35 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: -7, quality: 0 }');
    });
    it('should decrease normal items quality', function () {
        var item = new gilded_rose_1.Item("Temp Book", 15, 10);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Temp Book", 14, 9)]);
    });
    it('should decrease quality at twice the speed when sellIn is 0', function () {
        var item = new gilded_rose_1.Item("Temp Book", 5, 0);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Temp Book", 3, -1)]);
    });
    it('should never decrease the quality bellow 0', function () {
        var item = new gilded_rose_1.Item("Temp Book", 1, 0);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Temp Book", 0, -1)]);
    });
    it('should increase aged items quality', function () {
        var item = new gilded_rose_1.Item("Aged Brie", 15, 10);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Aged Brie", 16, 9)]);
    });
    it('should never increase aged items quality above 50', function () {
        var item = new gilded_rose_1.Item("Aged Brie", 50, 0);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Aged Brie", 50, -1)]);
    });
    it('should increase Back Stage Pass items quality by 2 when sellIn between 10 and 5', function () {
        var item = new gilded_rose_1.Item("Back Stage Pass", 9, 9);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Back Stage Pass", 11, 8)]);
    });
    it('should increase Back Stage Pass items quality by 3 when sellIn between 5 and 0', function () {
        var item = new gilded_rose_1.Item("Back Stage Pass", 15, 3);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Back Stage Pass", 18, 2)]);
    });
    it('should decrease Back Stage Pass items quality to 0 past sell in', function () {
        var item = new gilded_rose_1.Item("Back Stage Pass", 50, 0);
        var result = gilded_rose_1.Shop.updateQuality([item]);
        expect(result).to.deep.equal([new gilded_rose_1.Item("Back Stage Pass", 0, -1)]);
    });
});
var ItemHelper = (function () {
    function ItemHelper() {
    }
    ItemHelper.toSimpleString = function (items) {
        return items.map(function (item) { return ("Item { name: '" + item.name + "', sell_in: " + item.sell_in + ", quality: " + item.quality + " }"); }).join();
    };
    return ItemHelper;
}());
exports.ItemHelper = ItemHelper;
//# sourceMappingURL=gilded_rose.spec.js.map