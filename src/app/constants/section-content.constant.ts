import {SectionContentModel} from "../interface/section-content-model";
import {contributions} from "./contributions.constant";
import {projects} from "./projects.constant";

export const sectionContentModels: SectionContentModel[] = [
    {
        id: "about",
        title: "about me",
        text: "Hello! I'm Jamil Osoria Peralta. I'm a 17-year-old student from Hamburg, Germany. Currently my interests " +
            "focus particularly on web application development and, somewhat off-topic, playing the piano. At the moment I'm in my final " +
            "exam phase. Afterwards, my plan is to study software systems development. Furthermore, I'm very much looking " +
            "forward to future projects and learning a lot of new things in the process.",
    },
    {
        id: "skills",
        title: "competencies",
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
        id: "thankful",
        title: "thankful",
        text: `Many thanks to <a href="https://undraw.co/" target="_blank">unDraw</a> for providing ` +
            "free wonderful illustrations that open up new ways to create beautiful designs. Also thanks for a nice " +
            "inspiration regarding the text layout.",
    },
];
