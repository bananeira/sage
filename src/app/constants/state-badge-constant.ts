import {StateBadgeModel} from "../interface/state-badge-model";
import {State} from "../enum/state.enum";

export const stateBadgeModels: StateBadgeModel[] = [
    {
        id: "progressing",
        displayName: "PROGRESSING",
        state: State.Progressing,
    },
    {
        id: "pending",
        displayName: "PENDING",
        state: State.Pending,
    },
    {
        id: "concluded",
        displayName: "CONCLUDED",
        state: State.Concluded,
    },
    {
        id: "archived",
        displayName: "ARCHIVED",
        state: State.Archived,
    },
    {
        id: "empty",
        displayName: "",
        state: State.Empty,
    },
];
