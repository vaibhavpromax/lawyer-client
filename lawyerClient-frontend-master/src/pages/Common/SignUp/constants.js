import { courtNames } from "../../../constants/courtNames";
import { practiceAreas } from "../../../constants/practiceAreas";
import { languages } from "../../../constants/languages";
import { cities } from "../../../constants/cities";

const options = {
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

export const LAWYER_INPUT_FIELDS = [
  {
    name: "first_name",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "location_id",
    label: "Location",
    placeholder: "Select Location",
    type: "select",
    options: cities,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "text",
  },
  {
    name: "phone",
    label: " Phone",
    placeholder: "Enter Phone No.",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Select Gender",
    type: "select",
    options: genderOptions,
  },
  {
    name: "education",
    label: "Education",
    placeholder: "Your Education",
    type: "text",
  },

  {
    name: "experience",
    label: "Experience",
    placeholder: "Experience in years",
    type: "select",
    options: options,
  },
  {
    name: "courts",
    label: "Court Name",
    placeholder: "Enter Court name",
    type: "select",
    options: courtNames,
  },
  {
    name: "languages",
    label: "Language",
    placeholder: "Enter Languages",
    type: "select",
    options: languages,
  },
  {
    name: "practice_areas",
    label: "Practice Areas ",
    placeholder: "Enter Practice Areas",
    type: "select",
    options: practiceAreas,
  },
];

export const CLIENT_INPUT_FIELDS = [
  {
    name: "first_name",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "location_id",
    label: "Location",
    placeholder: "Select Location",
    type: "select",
    options: cities,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "text",
  },
  {
    name: "phone",
    label: " Phone No.",
    placeholder: "Enter Phone No.",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Select Gender",
    type: "select",
    options: genderOptions,
  },
];
