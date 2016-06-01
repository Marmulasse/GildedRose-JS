import {Item} from "../model/Item";

export interface Updater {
    decay(item:Item):number;
}
