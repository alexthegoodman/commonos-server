import { objectType } from "nexus";
import { Context } from "../../../context";

export const EmailLogType = objectType({
  name: "EmailLog",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("from", { type: "String" });
    t.field("to", { type: "String" });

    t.field("template", {
      type: "User",
      resolve: async (emaillog, __, context: Context) => {
        // TODO: just get creatorId off emaillog?
        return await context.prisma.emailTemplate.findFirst({
          where: {
            logs: {
              some: {
                id: emaillog.id as string,
              },
            },
          },
        });
      },
    });

    t.field("sender", {
      type: "User",
      resolve: async (emaillog, __, context: Context) => {
        // TODO: just get creatorId off emaillog?
        return await context.prisma.user.findFirst({
          where: {
            emailLogs: {
              some: {
                id: emaillog.id as string,
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
