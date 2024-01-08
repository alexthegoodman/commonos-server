import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateOrganizationMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrganization", {
      type: "Organization",
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_, { name }, { prisma, currentUser }: Context, x) => {
        const organization = await prisma.organization.create({
          data: {
            name,
            owner: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        return organization;
      },
    });
  },
});
