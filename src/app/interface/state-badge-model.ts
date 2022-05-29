import {BadgeModel} from "./badge-model";
import {State} from "../enum/state.enum";

export interface StateBadgeModel extends BadgeModel {
    state: State;
}
