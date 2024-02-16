import { objectType } from "nexus";
import { Context } from "../../../context";

export const ThreadType = objectType({
  name: "Thread",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("subject", { type: "String" });

    t.list.field("emails", {
      type: "Email",
      resolve: async (thread, __, context: Context) => {
        // TODO: just get creatorId off thread?
        return await context.prisma.email.findMany({
          where: {
            thread: {
              id: thread.id as string,
            },
          },
        });
      },
    });

    t.field("inbox", {
      type: "Inbox",
      resolve: async (thread, __, context: Context) => {
        return await context.prisma.inbox.findFirst({
          where: {
            threads: {
              some: {
                id: thread.id as string,
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
