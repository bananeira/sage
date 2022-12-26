import {LinkModel} from "../interface/link-box-model";
import {State} from "../enum/state.enum";
import {Status} from "../enum/status.enum";

export const tools: LinkModel[] = [
    {
        id: "complementbuilder",
        title: "complement builder",
        description: "The complement representation of numbers is used by computers to " +
            "make operations like subtraction more efficient. This tool explains and calculates " +
            "the complement of numbers to an arbitrary denominational number system (radix 2-16).",
        language: [
            "java",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/sage-toolbox/blob/main/src/main/java/com/sage/sagetoolbox/tool/ComplementBuilder.java",
        testLink: "https://github.com/bananeira/sage-toolbox/blob/main/src/main/java/com/sage/sagetoolbox/tool/ComplementBuilder.java",
        state: State.Concluded,
        status: Status.Active
    },
];
