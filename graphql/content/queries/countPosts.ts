import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CountPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("countPosts", {
      type: "Int",
      args: {
        postTypeId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const postCount = await prisma.post.count({
          where: {
            type: {
              id: postTypeId,
            },
            creator: {
              id: currentUser.id,
            },
          },
        });

        return postCount;
      },
    });
  },
});
