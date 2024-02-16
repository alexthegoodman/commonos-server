import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const TogglePublishedMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("togglePublished", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (_, { postId }, { prisma, currentUser }: Context, x) => {
        const currentPost = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (!currentPost) {
          throw new Error("Post not found");
        }

        const updatedPost = await prisma.post.update({
          data: {
            published: !currentPost.published,
          },
          where: {
            id: postId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return updatedPost;
      },
    });
  },
});
