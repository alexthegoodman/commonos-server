import { objectType } from "nexus";
import { Context } from "../../../context";

export const ContactSettingsType = objectType({
  name: "ContactSettings",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("fields", { type: "JSON" });

    t.field("user", {
      type: "User",
      resolve: async (contact, __, context: Context) => {
        // TODO: just get creatorId off company?
        return await context.prisma.user.findFirst({
          where: {
            contactSettings: {
              id: contact.id as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
