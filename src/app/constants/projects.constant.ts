import {LinkModel} from "../interface/link-box-model";
import {State} from "../enum/state.enum";

export const projects: LinkModel[] = [
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
        archivedComment: "This activity is archived, since I have " +
            "learned key features of programming with Spigot and Java through this very project. " +
            "However, clear thought outlines are missing here, which would define a strictly framed " +
            "context of the plug-in.",
    },
    {
        id: "homepage",
        title: "sage",
        description: "The homepage you're on right now is written using Angular. " +
            "Since this is technically overkill for a small web application, I'm still referring " +
            "to the GitHub repo, if interested...",
        language: [
            "angular",
            "typescript",
            "javascript",
            "html",
            "scss",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/sage",
        state: State.Pending,
    },
    {
        id: "teris",
        title: "Teris",
        description: "Teris provides general functions of Tetris as an API to create a basis for the construction of A.I.s. " +
            "This project was created in the course of my comp-sci class (see site).",
        language: [
            "react",
            "javascript",
            "html",
            "css",
        ],
        remit: [
            "ui",
            "web",
            "docs",
        ],
        link: "https://teris.vercel.app/",
        codeLink: "https://github.com/clk1006/tetris/",
        state: State.Concluded,
        conclusionDate: "15 Apr 2022",
    },
    {
        id: "terminal velocity",
        title: "terminal velocity",
        description: "The constant speed that a freely falling object reaches when resistance prevents further acceleration. " +
            "This simulation computes the terminal velocity of a cube with differing properties " +
            "in different environments, atmospheres.",
        language: [
            "insightmaker",
            "physics",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/5Xf4Qi4RZMfPpYAZQZFEfM/Terminalgeschwindigkeit-eines-W-rfels",
        state: State.Concluded,
        conclusionDate: "Feb-Mar 2022",
    },
    {
        id: "coupled pendulums",
        title: "pendulums",
        description: "I created this simulation for a school presentation, in which occurring energy exchange " +
            "under differing settings between coupled pendulums was to be demonstrated and explained.",
        language: [
            "insightmaker",
            "physics",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/lUM5LCAcR4nWCPAiQ3w6x/3-gekoppelte-Pendel-edit",
        state: State.Concluded,
        conclusionDate: "31 May 2021",
    },
    {
        id: "pandemic",
        title: "pan-d??mos",
        description: "This link leads to a school project in which an approximation of a " +
            "(classical) progression of a pandemic/epidemic was to be created.",
        language: [
            "insightmaker",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/4UT9qjXaBc265DOFOpD5XZ/Simulation-einer-Pandemie",
        state: State.Concluded,
        conclusionDate: "2 May 2021",
    },
    {
        id: "cardinal-spigot",
        title: "cardinal",
        description: "A first renewal of the concept from the previous SEss to implement a structure with stricter " +
            "logical sense divisions. This plugin is intended to deal with in-game management " +
            "capabilities for admins.",
        language: [
            "java",
            "spigot",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/spigot-cardinal",
        state: State.Pending,
    },
    {
        id: "codewars",
        title: "codewars",
        description: "Codewars is an educational community, on which software developers can " +
            "train on programming challenges. In this repository, I am collecting a few " +
            "assignments from codewars in Java and Python.",
        language: [
            "java",
            "python",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/codewars",
        state: State.Progressing,
    },
];
