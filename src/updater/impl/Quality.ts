import {Item} from "../../model/item";
import {Updater} from "../updater";
import {AGED_BRIE, SULFURAS, BACK_STAGE_PASS, CONJURED_MANA_CAKE} from "../../model/ItemType";


export class Quality implements Updater {
    private normalizeQuality(quality:number):number {
        if (quality >= 0 && quality <= 50) {
            return quality;
        } else if (quality < 0) {
            return 0;
        } else if (quality > 50) {
            return 50;
        }
    }

    private normalQualityDecay(item:Item):number {
        if (item.sellIn > 0) {
            return item.quality - 1;
        } else {
            return item.quality - 2;
        }
    }

    private agedBrieQualityDecay(item:Item):number {
        return item.sellIn > 0 ? item.quality + 1 : item.quality + 2;
    }

    private sulfurasQualityDecay(quality:number):number {
        return quality;
    }

    private backstagePassQualityDecay(item:Item):number {
        if (item.sellIn <= 10 && item.sellIn > 5) {
            return item.quality + 2;
        } else if (item.sellIn <= 10 && item.sellIn <= 5 && item.sellIn > 0) {
            return item.quality + 3;
        } else if (item.sellIn <= 0) {
            return 0;
        } else {
            return item.quality + 1;
        }
    }

    private conjuredQualityDecay(item:Item):number {
        if (item.sellIn > 0) {
            return item.quality - 2;
        } else {
            return item.quality - 4
        }
    }

    public decay(item:Item):number {
        switch (item.name) {
            case AGED_BRIE:
                return this.normalizeQuality(this.agedBrieQualityDecay(item));
            case SULFURAS:
                return this.sulfurasQualityDecay(item.quality)
            case BACK_STAGE_PASS:
                return this.normalizeQuality(this.backstagePassQualityDecay(item));
            case CONJURED_MANA_CAKE:
                return this.normalizeQuality(this.conjuredQualityDecay(item));
            default:
                return this.normalizeQuality(this.normalQualityDecay(item));
        }
    }
}

