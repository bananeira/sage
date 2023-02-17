import {SectionContentModel} from "../interface/section-content-model";
import {projects} from "./projects.constant";
import {skills} from "./skills.constant"
import {resources} from "./resources.constant";
import {tools} from "./tools.constant";

export const sectionContentModels: SectionContentModel[] = [
    {
        id: "about",
        title: "about me",
        text: "Hello everyone! I'm Sora, a fresh software-systems development student @UHH. Currently I'm interested in " +
            "(attention, surprise) software development fairly general and, certainly off-topic, playing the piano. " +
            "I am currently learning especially the formal basics of software development, computational " +
            "architectures and extend my knowledge in Java... and learn (suffer) quite a bit of mathematics " +
            "on the side. Furthermore, I'm currently exploring Angular and TypeScript for the site you are on right now."
    },
    {
        id: "skills",
        title: "competencies",
        text: "The following list sums up the skills and tools that I have acquired through my past experiences. " +
            "I can confidently work with any of these, but since I have not yet mastered them, " +
            "I am always ready to keep learning.",
        smallLinks: skills,
    },
    {
        id: "tools",
        title: "tools",
        tools: tools,
    },
    {
        id: "projects",
        title: "activities",
        links: projects,
    },
    {
        id: "resources",
        title: "resources",
        text: "The following is a list of the tools and resources that I generally use for working, learning and " +
            "sharing my results.",
        smallLinks: resources,
    },
    {
        id: "contact",
        title: "contact",
        text: `If you have any issues or feedback you would like to contact me about, you may send an e-mail to
            <a href="mailto:sora@sorata.dev">sora(at)sorata.dev</a>.`,
    },
    {
        id: "copyright",
        title: "",
        text: "",
    },
];
