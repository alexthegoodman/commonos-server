import { objectType } from "nexus";
import { Context } from "../../../context";

export const InboxType = objectType({
  name: "Inbox",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("username", { type: "String" });

    t.list.field("threads", {
      type: "Thread",
      resolve: async (inbox, __, context: Context) => {
        // TODO: just get creatorId off inbox?
        return await context.prisma.thread.findMany({
          where: {
            inbox: {
              id: inbox.id as string,
            },
          },
        });
      },
    });

    t.field("domain", {
      type: "DomainSettings",
      resolve: async (inbox, __, context: Context) => {
        return await context.prisma.domainSettings.findFirst({
          where: {
            inboxes: {
              some: {
                id: inbox.id as string,
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
