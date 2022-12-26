import {State} from "../enum/state.enum";
import {Status} from "../enum/status.enum";

export interface LinkModel {
    id: string;
    title: string;
    description?: string;
    language: string[];
    remit?: string[];
    link?: string;
    codeLink?: string;
    testLink?: string;
    state: State;
    status?: Status;
    conclusionDate?: string;
    archivedComment?: string;
}
