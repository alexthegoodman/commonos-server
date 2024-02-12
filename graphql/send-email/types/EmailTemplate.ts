import { objectType } from "nexus";
import { Context } from "../../../context";

export const EmailTemplateType = objectType({
  name: "EmailTemplate",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("context", { type: "JSON" });

    t.list.field("logs", {
      type: "User",
      resolve: async (emailtemplate, __, context: Context) => {
        // TODO: just get creatorId off emailtemplate?
        return await context.prisma.emailLog.findMany({
          where: {
            template: {
              id: emailtemplate.id as string,
            },
          },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: async (emailtemplate, __, context: Context) => {
        // TODO: just get creatorId off emailtemplate?
        return await context.prisma.user.findFirst({
          where: {
            emailTemplates: {
              some: {
                id: emailtemplate.id as string,
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
