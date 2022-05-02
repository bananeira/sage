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
            "you will also find the link to the code here. The homepage is written using Angular, which technically " +
            "is a bit overkill for a simple web application like this, thus I'm listing it here, just " +
            "for reference purposes.",
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
