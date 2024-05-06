import { TechradarData } from "../../lib/main";

const data: TechradarData = {
  id: "team2",
  rings: [
    { id: "adopt", name: "ADOPT" },
    { id: "trial", name: "TRIAL" },
    { id: "assess", name: "ASSESS" },
    { id: "hold", name: "HOLD" },
  ],
  slices: [
    {
      name: "Frameworks & Ecosystems",
      blipsByRing: {
        adopt: [{ name: "React" }],
        trial: [{ name: "Vue" }, { name: "Angular (2+)" }],
        hold: [{ name: "AngularJS (1)" }, { name: "jQuery" }],
      },
    },
    {
      name: "Linting & Formatting",
      blipsByRing: {
        adopt: [{ name: "ESLint" }, { name: "Prettier" }],
        assess: [{ name: "AirBNB Eslint Config" }],
      },
    },
    {
      name: "Languages",
      blipsByRing: {
        adopt: [{ name: "CRA (Create React App)" }],
        assess: [{ name: "Next.js" }, { name: "React App Rewired" }],
      },
    },
    {
      name: "Infrastucture",
      blipsByRing: {
        adopt: [{ name: "AWS CodePipeline" , url:"https://github.com/moj-analytical-services/techradar/discussions/5"},
                { name: "REST", url:"https://en.wikipedia.org/wiki/REST" }],
        trial: [{ name: "Jenkins" }],
        hold: [{ name: "Bamboo", state: 'down' }, { name: "TeamCity" }],
      },
    },
  ],
};

export default data;
