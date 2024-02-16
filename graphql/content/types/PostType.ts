import { objectType } from "nexus";
import { Context } from "../../../context";

export const PostTypeType = objectType({
  name: "PostType",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });
    t.field("fields", { type: "JSON" });

    t.list.field("posts", {
      type: "Post",
      resolve: async (postType, __, context: Context) => {
        // TODO: just get creatorId off posttype?
        return await context.prisma.post.findMany({
          where: {
            type: {
              id: postType.id as string,
            },
          },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: async (postType, __, context: Context) => {
        // TODO: just get creatorId off posttype?
        return await context.prisma.user.findFirst({
          where: {
            postTypes: {
              some: {
                id: postType.id as string,
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
