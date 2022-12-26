import {LinkModel} from "../interface/link-box-model";
import {State} from "../enum/state.enum";

export const tools: LinkModel[] = [
    {
        id: "serveressentials",
        title: "SEss 1.18",
        description: "This is my attempt to get used to programming Minecraft plugins in " +
            "Spigot and Java. Curious to see how far scope will " +
            "expand over time...",
        language: [
            "java",
            "spigot",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/ServerEssentials",
        state: State.Archived,
    },
];
