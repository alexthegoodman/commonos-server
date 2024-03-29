import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateCompanyMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateCompany", {
      type: "Company",
      args: {
        companyId: nonNull(stringArg()),
        fields: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { companyId, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updatedCompany = await prisma.company.update({
          where: {
            id: companyId,
          },
          data: {
            fields: JSON.parse(fields),
          },
        });

        console.info("updatedCompany", updatedCompany);

        return updatedCompany;
      },
    });
  },
});
