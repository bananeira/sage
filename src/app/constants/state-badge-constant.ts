import {StateBadgeModel} from "../interface/state-badge-model";
import {Input} from "@angular/core";

export const stateBadgeModels: StateBadgeModel[] = [
    {
        id: "progressing",
        displayName: "IN PROGRESS",
    },
    {
        id: "new",
        displayName: "NEW",
    },
    {
        id: "pending",
        displayName: "PENDING",
    },
    {
        id: "concluded",
        displayName: "CONCLUDED",
    },
];
