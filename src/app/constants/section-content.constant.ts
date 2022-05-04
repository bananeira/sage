import {SectionContentModel} from "../interface/section-content-model";
import {contributions} from "./contributions.constant";
import {projects} from "./projects.constant";
import {skills} from "./skills.constant"
import {resources} from "./resources.constant";

export const sectionContentModels: SectionContentModel[] = [
    {
        id: "about",
        title: "about me",
        text: "Hello! I'm Jamil Osoria Peralta. I'm a 17-year-old student. Currently my interests " +
            "focus particularly on web application development and, somewhat off-topic, playing the piano. " +
            "At the moment I'm in my finals, afterwards my plan is to study software systems development. " +
            "Furthermore, I'm very much looking forward to future projects and learning a lot of new " +
            "things in the process.",
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
        title: "my projects",
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
            "free wonderful illustrations that open up new ways to create beautiful designs. Also thanks for a nice " +
            "inspiration regarding the text layout.",
    },
];
