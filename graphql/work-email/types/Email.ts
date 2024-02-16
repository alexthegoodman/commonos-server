import { objectType } from "nexus";
import { Context } from "../../../context";

export const EmailType = objectType({
  name: "Email",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("from", { type: "String" });
    t.field("to", { type: "String" });
    t.field("subject", { type: "String" });
    t.field("body", { type: "String" });
    t.field("unread", { type: "Boolean" });

    t.field("thread", {
      type: "Thread",
      resolve: async (email, __, context: Context) => {
        // TODO: just get creatorId off email?
        return await context.prisma.thread.findFirst({
          where: {
            emails: {
              some: {
                id: email.id as string,
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
