import StarRating from "../../../components/StarRating/StarRating";

export const createLawyerProfile = (user) => {
  return [
    {
      name: "Name",
      value: user.full_name,
    },
    {
      name: "Email",
      value: user.email,
    },
    {
      name: "Phone",
      value: user.phone,
    },
    {
      name: "Address",
      value: `${user?.location?.city} ,${user?.location?.state}`,
    },
    {
      name: "Education",
      value: user.education,
    },
    {
      name: "Experience",
      value: user.experience,
    },
    {
      name: "Gender",
      value: user.gender,
    },
    {
      name: "Languages",
      value: user.languages.map((el) => el.name).join(" ,"),
    },
    {
      name: "Practice Area",
      value: user?.practice_areas
        ?.map((el) => el?.practice_area?.name)
        ?.join(", "),
    },
    {
      name: "Rating",
      value: user.rating,
    },
  ];
};
