import {LinkModel} from "../interface/link-box-model";
import {State} from "../enum/state.enum";

export const projects: LinkModel[] = [
    {
        id: "toolbox",
        title: `toolbox`,
        description: `<span>A collection of tools that I continuously write and collect here. All tools included here are ` +
            `made available under <a href='#tools'>tools</a> with a graphical interface.</span>`,
        language: [
            "java",
            "spring",
        ],
        remit: [

        ],
        codeLink: "https://github.com/bananeira/sage-toolbox",
        state: State.Empty,
        conclusionDate: `<img src="https://img.shields.io/github/last-commit/bananeira/sage-toolbox?logo=GitHub&style=flat-square" alt="">`,
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
        codeLink: "https://github.com/bananeira/sage/",
        conclusionDate: `<img src="https://img.shields.io/github/last-commit/bananeira/sage?logo=GitHub&style=flat-square" alt="">`,
        state: State.Empty,
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
            "docs",
        ],
        link: "https://teris.vercel.app/",
        codeLink: "https://github.com/clk1006/tetris/",
        state: State.Empty,
        conclusionDate: `<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/clk1006/teris?logo=GitHub&style=flat-square">`,
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
        id: "latex-temp-jan24",
        title: "latex-temp-jan24",
        description: "This is a tidied up version of my LaTeX template for (my) homework.",
        language: [
            "tex",
        ],
        remit: [

        ],
        link: "https://github.com/bananeira/latex-temp-jan24",
        state: State.Empty,
        conclusionDate: `<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bananeira/latex-temp-jan24?logo=GitHub&style=flat-square">`,
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
        title: "pan-dēmos",
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
        state: State.Empty,
        conclusionDate: `<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bananeira/codewars?logo=GitHub&style=flat-square">`
    },
];
