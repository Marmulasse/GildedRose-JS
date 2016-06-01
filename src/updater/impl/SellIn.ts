import {Updater} from "../updater";
import {Item} from "../../model/Item";
import {SULFURAS} from "../../model/ItemType";

export class SellIn implements Updater {
    public decay(item:Item):number {
        if (item.name === SULFURAS) {
            return item.sellIn
        } else {
            return item.sellIn - 1;
        }
    }
}