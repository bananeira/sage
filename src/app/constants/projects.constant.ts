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
        description: "This is an attempt on my part to get used to programming Minecraft plugins in " +
            "Spigot and to Java. The scope of this project is negligible so far, but I am curious to see how far it will " +
            "expand as soon as I have time. Until then, let this project be considered as a " +
            "placeholder.",
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
        description: "This link refers to this homepage. Since it's also a relatively extensive project of mine, " +
            "you will also find the link to the code here. The homepage is written using Angular. " +
            "Since this is technically a bit overkill for a small web application, I would still like to refer " +
            "to the code, if interested...",
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
];
