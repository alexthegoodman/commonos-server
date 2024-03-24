import { objectType } from "nexus";
import { Context } from "../../../context";

export const WorkEmailTemplateType = objectType({
  name: "WorkEmailTemplate",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("subject", { type: "String" });
    t.field("body", { type: "String" });
    t.field("initialMarkdown", { type: "String" });

    t.field("workEmailFolder", {
      type: "WorkEmailFolder",
      resolve: async (template, __, context: Context) => {
        return await context.prisma.workEmailFolder.findFirst({
          where: {
            workEmailTemplates: {
              some: {
                id: template.id as string,
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
