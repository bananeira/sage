import {SectionContentModel} from "../interface/section-content-model";
import {projects} from "./projects.constant";
import {skills} from "./skills.constant"
import {resources} from "./resources.constant";
import {tools} from "./tools.constant";

export const sectionContentModels: SectionContentModel[] = [
    {
        id: "about",
        title: "about me",
        text: "Hello everyone! I'm Sora, a software-systems development student at University of Hamburg. Currently I'm interested in " +
            "(attention, surprise) software development fairly general and, certainly off-topic, playing the piano. " +
            "I am currently learning theory of computation, distributed systems and system security " +
            "and extend my knowledge in Java... and learn (suffer) quite a bit of mathematics " +
            "on the side."
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
        text: "A collection of tools that I write continuously and collect here. It should also be kept in mind " +
            "that the tools on scientific topics are an elaboration on my part, based on the knowledge I acquired " +
            "during my studies. Therefore, the tools are limited to my understanding of the topic. " +
            "Consequently, it is not recommended that they are used without careful consideration. " +
            "That being said, I do value factual precision and I will continue to update the existing " +
            "tools if any problems are found.",
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
            <a href="mailto:sora@sora.coffee">sora at sora dot coffee</a>.`,
    },
    {
        id: "copyright",
        title: "",
        text: "",
    },
];
