import { objectType } from "nexus";
import { Context } from "../../../context";

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("markdown", { type: "String" });
    t.field("fields", { type: "JSON" });

    t.field("published", { type: "Boolean" });

    t.field("type", {
      type: "PostType",
      resolve: async (post, __, context: Context) => {
        // TODO: just get creatorId off post?
        return await context.prisma.postType.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: async (post, __, context: Context) => {
        // TODO: just get creatorId off post?
        return await context.prisma.user.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
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
