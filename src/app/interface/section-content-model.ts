import {LinkModel} from "./link-box-model";

export interface SectionContentModel {
    id: string;
    title: string;
    text?: string;
    links?: LinkModel[];
}
