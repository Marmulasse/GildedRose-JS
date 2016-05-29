"use strict";
var Item = (function () {
    function Item(name, quality, sell_in) {
        this.name = name;
        this.quality = quality;
        this.sell_in = sell_in;
    }
    ;
    return Item;
}());
exports.Item = Item;
exports.default_items = [];
exports.default_items.push(new Item('+5 Dexterity Vest', 10, 20));
exports.default_items.push(new Item('Aged Brie', 2, 0));
exports.default_items.push(new Item('Elixir of the Mongoose', 5, 7));
exports.default_items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
exports.default_items.push(new Item('Back Stage Pass', 15, 20));
exports.default_items.push(new Item('Conjured Mana Cake', 3, 6));
var Shop = (function () {
    function Shop() {
    }
    Shop.updateQuality = function (items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].name != 'Aged Brie' && items[i].name != 'Back Stage Pass') {
                if (items[i].quality > 0) {
                    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        items[i].quality = items[i].quality - 1;
                    }
                }
            }
            else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1;
                    if (items[i].name == 'Back Stage Pass') {
                        if (items[i].sell_in < 11) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1;
                            }
                        }
                        if (items[i].sell_in < 6) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1;
                            }
                        }
                    }
                }
            }
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                items[i].sell_in = items[i].sell_in - 1;
            }
            if (items[i].sell_in < 0) {
                if (items[i].name != 'Aged Brie') {
                    if (items[i].name != 'Back Stage Pass') {
                        if (items[i].quality > 0) {
                            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                items[i].quality = items[i].quality - 1;
                            }
                        }
                    }
                    else {
                        items[i].quality = items[i].quality - items[i].quality;
                    }
                }
                else {
                    if (items[i].quality < 50) {
                        items[i].quality = items[i].quality + 1;
                    }
                }
            }
        }
        return items;
    };
    return Shop;
}());
exports.Shop = Shop;
//# sourceMappingURL=gilded_rose.js.map