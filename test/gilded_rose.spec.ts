import chai = require('chai');
import Shop from "../src/gilded_rose";
import {Item} from "../src/model/item";
import {SellIn} from "../src/updater/impl/SellIn";
import {Quality} from "../src/updater/impl/Quality";

var expect = chai.expect;

describe("Gilded Rose", () => {

    var shop:Shop;

    beforeEach('', () => {
        var items:Array<Item> =
            [
                new Item('+5 Dexterity Vest', 20, 10),
                new Item('Aged Brie', 0, 2),
                new Item('Elixir of the Mongoose', 7, 5),
                new Item('Sulfuras, Hand of Ragnaros', 80, 0),
                new Item('Back Stage Pass', 20, 15),
                new Item('Conjured Mana Cake', 6, 3)
            ];
        shop = new Shop(items, new SellIn(), new Quality());
    });

    it("should update quality of all items once", () => {
        shop.updateQuality();

        expect(ItemHelper.toSimpleString(shop.getItems())).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 9, quality: 19 },' +
            'Item { name: \'Aged Brie\', sell_in: 1, quality: 1 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 4, quality: 6 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 14, quality: 21 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 2, quality: 4 }');

    });

    it("should update quality of all items twice", () => {
        shop.updateQuality();
        shop.updateQuality();

        expect(ItemHelper.toSimpleString(shop.getItems())).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 8, quality: 18 },' +
            'Item { name: \'Aged Brie\', sell_in: 0, quality: 2 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 3, quality: 5 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 13, quality: 22 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 1, quality: 2 }');

    });

    it("should update quality of all items ten times", () => {
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();
        shop.updateQuality();

        expect(ItemHelper.toSimpleString(shop.getItems())).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 0, quality: 10 },' +
            'Item { name: \'Aged Brie\', sell_in: -8, quality: 18 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: -5, quality: 0 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 5, quality: 35 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: -7, quality: 0 }');

    });

    it('should decrease normal items quality', () => {
        var item = new Item("Temp Book", 15, 10);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Temp Book", 14, 9)]);

    });

    it('should decrease quality at twice the speed when sellIn is 0', () => {
        var item = new Item("Temp Book", 5, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Temp Book", 3, -1)]);
    });

    it('should never decrease the quality bellow 0', () => {
        var item = new Item("Temp Book", 1, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Temp Book", 0, -1)]);

    });

    it('should increase aged items quality', () => {
        var item = new Item("Aged Brie", 15, 10);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Aged Brie", 16, 9)]);

    });

    it('should never increase aged items quality above 50', () => {
        var item = new Item("Aged Brie", 50, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Aged Brie", 50, -1)]);

    });

    it('should increase Back Stage Pass items quality by 2 when sellIn between 10 and 5', () => {
        var item = new Item("Back Stage Pass", 9, 9);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Back Stage Pass", 11, 8)]);
    });

    it('should increase Back Stage Pass items quality by 3 when sellIn between 5 and 0', () => {
        var item = new Item("Back Stage Pass", 15, 3);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Back Stage Pass", 18, 2)]);
    });

    it('should decrease Back Stage Pass items quality to 0 past sell in', () => {
        var item = new Item("Back Stage Pass", 50, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Back Stage Pass", 0, -1)]);
    });

    it('should never decrease Conjured items quality bellow 0', () => {
        var item = new Item("Conjured Mana Cake", 1, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Conjured Mana Cake", 0, -1)]);
    });

    it('should decrease Conjured items quality bellow twice the rate of the normal one when normal', () => {
        var item = new Item("Conjured Mana Cake", 15, 10);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Conjured Mana Cake", 13, 9)]);
    });

    it('should decrease Conjured items quality bellow twice the rate of the normal one when past sell in', () => {
        var item = new Item("Conjured Mana Cake", 15, 0);
        shop = new Shop([item], new SellIn(), new Quality());

        shop.updateQuality();

        expect(shop.getItems()).to.deep.equal([new Item("Conjured Mana Cake", 11, -1)]);
    });

});

export class ItemHelper {
    static toSimpleString(items:Array<Item>):String {
        return items.map((item) => `Item { name: '${item.name}', sell_in: ${item.sellIn}, quality: ${item.quality} }`).join();
    }
}
