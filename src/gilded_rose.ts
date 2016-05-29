export class Item {
    constructor(public name:string,
                public quality:number,
                public sell_in:number
                ){};
}

export var default_items:Array<Item> = [];

default_items.push(new Item('+5 Dexterity Vest', 10, 20));
default_items.push(new Item('Aged Brie', 2, 0));
default_items.push(new Item('Elixir of the Mongoose', 5, 7));
default_items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
default_items.push(new Item('Back Stage Pass', 15, 20));
default_items.push(new Item('Conjured Mana Cake', 3, 6));

export class Shop {
    static updateQuality(items:Array<Item>):Array<Item> {
        for (var i = 0; i < items.length; i++) {
            if (items[i].name != 'Aged Brie' && items[i].name != 'Back Stage Pass') {
                if (items[i].quality > 0) {
                    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        items[i].quality = items[i].quality - 1
                    }
                }
            } else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1
                    if (items[i].name == 'Back Stage Pass') {
                        if (items[i].sell_in < 11) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1
                            }
                        }
                        if (items[i].sell_in < 6) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1
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
                                items[i].quality = items[i].quality - 1
                            }
                        }
                    } else {
                        items[i].quality = items[i].quality - items[i].quality
                    }
                } else {
                    if (items[i].quality < 50) {
                        items[i].quality = items[i].quality + 1
                    }
                }
            }
        }
        
        return items;
    }
}