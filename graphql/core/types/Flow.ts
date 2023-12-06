import { objectType } from "nexus";
import { Context } from "../../../context";

export const FlowType = objectType({
  name: "Flow",
  definition(t) {
    // PRIVATE: ...
    t.field("id", { type: "String" });
    t.field("prompt", { type: "String" });

    t.field("type", {
      type: "Type",
      resolve: async (flow, __, context: Context) => {
        return await context.prisma.type.findFirst({
          where: {
            flows: {
              some: {
                id: flow.id,
              },
            },
          },
        });
      },
    });

    t.field("questionsContext", { type: "JSON" });
    t.field("resultsContext", { type: "JSON" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
