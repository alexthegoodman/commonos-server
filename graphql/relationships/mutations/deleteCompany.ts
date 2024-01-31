import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteCompanyMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteCompany", {
      type: "String",
      args: {
        companyId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { companyId },
        { prisma, currentUser }: Context,
        x
      ) => {
        await prisma.company.delete({
          where: {
            id: companyId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return "DELETED";
      },
    });
  },
});