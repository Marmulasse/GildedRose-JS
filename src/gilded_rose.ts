import {Item} from "./model/Item";
import {Updater} from "./updater/updater";

export default class Shop {
    constructor(private items:Array<Item>,
                private sellInUpdater:Updater,
                private qualityUpdater:Updater) {
    }

    updateQuality() {
        this.items = this.items
            .map((item) => new Item(item.name, this.qualityUpdater.decay(item), this.sellInUpdater.decay(item)));
    }

    getItems():Array<Item> {
        return this.items;
    }
}

