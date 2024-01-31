import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const ContactQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("contact", {
      type: "Contact",
      args: {
        contactId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { contactId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const contact = await prisma.contact.findUnique({
          where: {
            id: contactId,
          },
        });

        return contact;
      },
    });
  },
});
