import chai = require('chai');
var expect = chai.expect;
import {Item, Shop} from "../src/gilded_rose";

describe("Gilded Rose", () => {

    var items:Array<Item>;
    beforeEach('', () => {
        items = [];
        items.push(new Item('+5 Dexterity Vest', 20, 10));
        items.push(new Item('Aged Brie', 0, 2));
        items.push(new Item('Elixir of the Mongoose', 7, 5));
        items.push(new Item('Sulfuras, Hand of Ragnaros', 80, 0));
        items.push(new Item('Back Stage Pass', 20, 15));
        items.push(new Item('Conjured Mana Cake', 6, 3));
    });
    
    it("should update quality of all items once", () => {
        var result = Shop.updateQuality(items);
        expect(ItemHelper.toSimpleString(result)).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 9, quality: 19 },' +
            'Item { name: \'Aged Brie\', sell_in: 1, quality: 1 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 4, quality: 6 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 14, quality: 21 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 2, quality: 5 }');
        
    });

    it("should update quality of all items twice", () => {
        var result = Shop.updateQuality(items);
        result = Shop.updateQuality(result);
        expect(ItemHelper.toSimpleString(result)).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 8, quality: 18 },' +
            'Item { name: \'Aged Brie\', sell_in: 0, quality: 2 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: 3, quality: 5 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 13, quality: 22 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: 1, quality: 4 }');
        
    });

    it("should update quality of all items ten times", () => {
        var result = Shop.updateQuality(items);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        result = Shop.updateQuality(result);
        expect(ItemHelper.toSimpleString(result)).to.equal(
            'Item { name: \'+5 Dexterity Vest\', sell_in: 0, quality: 10 },' +
            'Item { name: \'Aged Brie\', sell_in: -8, quality: 18 },' +
            'Item { name: \'Elixir of the Mongoose\', sell_in: -5, quality: 0 },' +
            'Item { name: \'Sulfuras, Hand of Ragnaros\', sell_in: 0, quality: 80 },' +
            'Item { name: \'Back Stage Pass\', sell_in: 5, quality: 35 },' +
            'Item { name: \'Conjured Mana Cake\', sell_in: -7, quality: 0 }');
        
    });

    it('should decrease normal items quality', () => {
        var item = new Item("Temp Book", 15, 10);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Temp Book", 14, 9)]);
        
    });
    
    it('should decrease quality at twice the speed when sellIn is 0', () => {
        var item = new Item("Temp Book", 5, 0);
        var result:Array<Item> = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Temp Book", 3, -1)]);
        
    });

    it('should never decrease the quality bellow 0', () => {
        var item = new Item("Temp Book", 1, 0);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Temp Book", 0, -1)]);
        
    });

    it('should increase aged items quality', () => {
        var item = new Item("Aged Brie", 15, 10);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Aged Brie", 16, 9)]);
        
    });

    it('should never increase aged items quality above 50', () => {
        var item = new Item("Aged Brie", 50, 0);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Aged Brie", 50, -1)]);
        
    });

    it('should increase Back Stage Pass items quality by 2 when sellIn between 10 and 5', () => {
        var item = new Item("Back Stage Pass", 9, 9);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Back Stage Pass", 11, 8)]);
        
    });

    it('should increase Back Stage Pass items quality by 3 when sellIn between 5 and 0', () => {
        var item = new Item("Back Stage Pass", 15, 3);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Back Stage Pass", 18, 2)]);
        
    });

    it('should decrease Back Stage Pass items quality to 0 past sell in', () => {
        var item = new Item("Back Stage Pass", 50, 0);
        var result = Shop.updateQuality([ item ]);
        expect(result).to.deep.equal([new Item("Back Stage Pass", 0, -1)]);
        
    });


});

export class ItemHelper {
    static toSimpleString(items:Array<Item>):String {
        return items.map((item) => `Item { name: '${item.name}', sell_in: ${item.sell_in}, quality: ${item.quality} }`).join();
    }
}



