import {LinkModel} from "./link-box-model";
import {SmallLinkModel} from "./small-link-model";
import {ToolShowcaseModel} from "./tool-showcase-model";

export interface SectionContentModel {
    id: string;
    title: string;
    text?: string;
    links?: LinkModel[];
    smallLinks?: SmallLinkModel[];
    tools?: ToolShowcaseModel[];
}
