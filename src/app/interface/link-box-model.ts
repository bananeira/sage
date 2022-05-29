import {State} from "../enum/state.enum";

export interface LinkModel {
    id: string;
    title: string;
    description?: string;
    language: string[];
    remit?: string[];
    link?: string;
    codeLink?: string;
    state: State;
    conclusionDate?: string;
}
