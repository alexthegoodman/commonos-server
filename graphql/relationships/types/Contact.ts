import { objectType } from "nexus";
import { Context } from "../../../context";

export const ContactType = objectType({
  name: "Contact",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("fields", { type: "JSON" });

    t.field("creator", {
      type: "User",
      resolve: async (contact, __, context: Context) => {
        // TODO: just get creatorId off contact?
        return await context.prisma.user.findFirst({
          where: {
            contacts: {
              some: {
                id: contact.id as string,
              },
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
