import { objectType } from "nexus";
import { Context } from "../../../context";

export const FeedType = objectType({
  name: "Feed",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("url", { type: "String" });

    t.field("creator", {
      type: "User",
      resolve: async (sheet, __, context: Context) => {
        // TODO: just get creatorId off sheet?
        return await context.prisma.user.findFirst({
          where: {
            sheets: {
              some: {
                id: sheet.id as string,
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
