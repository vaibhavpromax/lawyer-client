import { courtNames } from "../../../constants/courtNames";
import { practiceAreas } from "../../../constants/practiceAreas";
import { languages } from "../../../constants/languages";
import { cities } from "../../../constants/cities";

const experienceOptions = {
  0: "<1yr",
  1: "1-2yr",
  2: "2-3yr",
  3: "3-4yr",
  4: "4-5yr",
  5: ">5yr",
};

const genderOptions = {
  male: "Male",
  femlae: "Female",
};

export const LAWYER_FILTER = [
  {
    name: "location_id",
    label: "Location",
    placeholder: "Select City",
    type: "select",
    options: cities,
  },
  {
    name: "practice_area_id",
    label: "Practice Areas ",
    placeholder: "Enter Practice Areas",
    type: "select",
    options: practiceAreas,
  },
  {
    name: "court_id",
    label: "Court Name",
    placeholder: "Select Court",
    type: "select",
    options: courtNames,
  },
  {
    name: "experience",
    label: "Experience",
    placeholder: "Select Experience",
    type: "select",
    options: experienceOptions,
  },
  {
    name: "language_id",
    label: "Language",
    placeholder: "Select Language",
    type: "select",
    options: languages,
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Select Gender",
    type: "select",
    options: genderOptions,
  },
];
