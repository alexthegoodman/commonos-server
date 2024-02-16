import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("post", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (_, { postId }, { prisma, currentUser }: Context, x) => {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return post;
      },
    });
  },
});
