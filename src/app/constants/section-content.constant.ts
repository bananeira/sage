import {SectionContentModel} from "../interface/section-content-model";
import {contributions} from "./contributions.constant";
import {projects} from "./projects.constant";
import {skills} from "./skills.constant"
import {resources} from "./resources.constant";

export const sectionContentModels: SectionContentModel[] = [
    {
        id: "about",
        title: "about me",
        text: "Hello! I'm Jamil Osoria Peralta, a 17-year-old student. Currently my interests " +
            "are particularly web application development and/or software development and, somewhat off-topic, playing the piano. " +
            "At the moment I'm in my finals, afterwards my plan is to study software systems development."
    },
    {
        id: "skills",
        title: "competencies",
        text: "The following list basically refers to those instances that I have recently dealt with to " +
            "the extent that I think I can deal with them in principle. This does not mean that I have mastered " +
            "them perfectly, but that the instances listed are the ones I am more or less able to work with. " +
            "Furthermore, the listed instances are not ordered according to competence.",
        smallLinks: skills,
    },
    {
        id: "projects",
        title: "activities",
        links: projects,
    },
    {
        id: "contributions",
        title: "contributions",
        links: contributions,
    },
    {
        id: "resources",
        title: "tools/resources",
        text: "The following is a list of the tools and resources that I generally use for learning. " +
            "The following is a list of the tools and resources I generally use to learn and share my results.",
        smallLinks: resources,
    },
    {
        id: "thankful",
        title: "thankful",
        text: `Many thanks to <a href="https://undraw.co/" target="_blank">unDraw</a> for providing ` +
            "wonderful illustrations! Also thanks for a nice inspiration regarding the text layout ;).",
    },
    {
        id: "contact",
        title: "contact",
        text: `If you have any issues you would like to contact me about or feedback, feel free to send me an e-mail via
            <span class="e-mail">de.jamil(at)proton.me</span>.`,
    },
    {
        id: "copyright",
        title: "",
        text: "",
    },
];
