import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myPosts", {
      type: "Post",
      args: {
        postTypeId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const posts = await prisma.post.findMany({
          where: {
            type: {
              id: postTypeId,
            },
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return posts;
      },
    });
  },
});
