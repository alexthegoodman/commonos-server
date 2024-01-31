import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateCompanyMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createCompany", {
      type: "Company",
      args: {
        fields: nonNull(stringArg()),
      },
      resolve: async (_, { fields }, { prisma, currentUser }: Context, x) => {
        const newCompany = await prisma.company.create({
          data: {
            fields: JSON.parse(fields),
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newCompany", newCompany);

        return newCompany;
      },
    });
  },
});
