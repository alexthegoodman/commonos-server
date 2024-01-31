import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateContactMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateContact", {
      type: "Contact",
      args: {
        contactId: nonNull(stringArg()),
        fields: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { contactId, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updatedContact = await prisma.contact.update({
          where: {
            id: contactId,
          },
          data: {
            fields: JSON.parse(fields),
          },
        });

        console.info("updatedContact", updatedContact);

        return updatedContact;
      },
    });
  },
});