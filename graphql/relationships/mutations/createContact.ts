import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateContactMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createContact", {
      type: "Contact",
      args: {
        fields: nonNull(stringArg()),
      },
      resolve: async (_, { fields }, { prisma, currentUser }: Context, x) => {
        const newContact = await prisma.contact.create({
          data: {
            fields: JSON.parse(fields),
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newContact", newContact);

        return newContact;
      },
    });
  },
});
