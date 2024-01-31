import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteContactMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteContact", {
      type: "String",
      args: {
        contactId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { contactId },
        { prisma, currentUser }: Context,
        x
      ) => {
        await prisma.contact.delete({
          where: {
            id: contactId,
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
