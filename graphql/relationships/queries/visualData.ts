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
            let items = await prisma.contact.findMany({
              where: {
                creator: {
                  id: currentUser.id,
                },
              },
            });

            // let contactSettings = await prisma.contactSettings.findFirst({
            //   where: {
            //     user: {
            //       id: currentUser.id,
            //     },
            //   },
            // });

            // let counts = {};
            // items.forEach((item) => {
            //   let fields = item.fields as any;
            //   // count unique values in fields

            //   Object.keys(fields).forEach((field) => {
            //     if (counts[field]) {
            //       counts[field] += 1;
            //     } else {
            //       counts[field] = 1;
            //     }
            //   });
            // });

            let counts = items
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
            break;
        }

        console.info("data", data);

        return data;
      },
    });
  },
});
