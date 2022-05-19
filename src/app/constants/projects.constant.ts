import {LinkModel} from "../interface/link-box-model";

export const projects: LinkModel[] = [
    {
        id: "teris",
        title: "Teris API",
        description: "This link refers to a recreation of the " +
            "game Tetris to provide its functions as an API, so that our classmates could create AIs " +
            "to battle against each other. This project was created in the course of my comp-sci class (see site).",
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
    },
    {
        id: "serveressentials",
        title: "1.18 ServerEssentials",
        description: "This is my attempt to get used to programming Minecraft plugins in " +
            "Spigot and Java. The scope of this project is negligible so far, but I am curious to see how far it will " +
            "expand over time. Until then, let this project be considered as a placeholder.",
        language: [
            "java",
            "spigot",
        ],
        remit: [
            "back-end"
        ],
        codeLink: "https://github.com/bananeira/ServerEssentials",
    },
    {
        id: "homepage",
        title: "This page",
        description: "This homepage is written using Angular. " +
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
            "front-end"
        ],
        codeLink: "https://github.com/bananeira/sage",
    },
    {
        id: "terminal velocity",
        title: "Terminal velocity",
        description: "This link will take you to an InsightMaker simulation. " +
            "It computes the terminal velocity of a cube with differing properties in different environments, atmospheres.",
        language: [
            "insightmaker",
            "physics",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/5Xf4Qi4RZMfPpYAZQZFEfM/Terminalgeschwindigkeit-eines-W-rfels",
    },
    {
        id: "coupled pendulums",
        title: "Coupled pendulums",
        description: "I created this simulation for a school presentation, in which occurring energy exchange " +
            "under differing settings between coupled pendulums was to be demonstrated and explained.",
        language: [
            "insightmaker",
            "physics",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/lUM5LCAcR4nWCPAiQ3w6x/3-gekoppelte-Pendel-edit",
    },
    {
        id: "pandemic",
        title: "A pandemic...",
        description: "This link leads to a school project in which an approximation of a " +
            "(classical) progression of a pandemic/epidemic was to be created.",
        language: [
            "insightmaker",
        ],
        remit: [

        ],
        link: "https://insightmaker.com/insight/4UT9qjXaBc265DOFOpD5XZ/Simulation-einer-Pandemie",
    },
];
