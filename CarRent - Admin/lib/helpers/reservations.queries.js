import QueryString from "qs";

export const dashboardReservations = QueryString.stringify({
  fields: ["dateFrom", "dateTo", "price", "isPaid", "status"],
  populate: {
    car: {
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
      },
    },
    user: {
      fields: ["email"],
    },
  },
  sort: ["createdAt:desc"],
});
