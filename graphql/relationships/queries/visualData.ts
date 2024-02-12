import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const VisualDataQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("visualData", {
      type: "JSON",
      args: {
        item: nonNull(stringArg()),
        field: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { item, field },
        { prisma, currentUser }: Context,
        x
      ) => {
        let data;
        switch (item) {
          case "contacts":
            let contacts = await prisma.contact.findMany({
              where: {
                creator: {
                  id: currentUser.id,
                },
              },
            });

            let counts = contacts
              .map(({ fields }: any) => fields[field])
              .reduce((names, name) => {
                const count = names[name] || 0;
                names[name] = count + 1;
                return names;
              }, {});

            console.info("counts", counts);

            data = Object.keys(counts).map((key) => {
              return {
                label: key,
                value: counts[key],
              };
            });

            break;
          case "companies":
            let companies = await prisma.company.findMany({
              where: {
                creator: {
                  id: currentUser.id,
                },
              },
            });

            let companyCounts = companies
              .map(({ fields }: any) => fields[field])
              .reduce((names, name) => {
                const count = names[name] || 0;
                names[name] = count + 1;
                return names;
              }, {});

            console.info("companyCounts", companyCounts);

            data = Object.keys(companyCounts).map((key) => {
              return {
                label: key,
                value: companyCounts[key],
              };
            });

            break;
        }

        console.info("data", data);

        return data;
      },
    });
  },
});
