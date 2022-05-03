import {LinkModel} from "../interface/link-box-model";

export const projects: LinkModel[] = [
    {
        id: "teris",
        title: "teris api",
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
        id: "homepage",
        title: "(this homepage)",
        description: "This link refers to this homepage. Since it's also a relatively extensive project of mine, " +
            "you will also find the link to the code here. The homepage is written using Angular. " +
            "Since this is technically a bit overkill for a small web application, I would still like to refer " +
            "to the code, if interested...",
        language: [
            "ng",
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
