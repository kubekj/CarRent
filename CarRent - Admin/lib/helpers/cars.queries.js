import QueryString from "qs";

export const dashboardCars = QueryString.stringify({
  fields: ["pricePerDay", "maxSpeed", "year", "horsePower"],
  populate: {
    model: {
      fields: ["name"],
      populate: {
        model: {
          fields: ["name"],
          populate: {
            brand: {
              fields: ["name"],
            },
          },
        },
      },
    },
    picture: {
      fields: ["formats"],
    },
    galleries: {
      populate: {
        image: {
          fields: ["formats"],
        },
      },
    },
  },
  sort: ["createdAt:desc"],
});
