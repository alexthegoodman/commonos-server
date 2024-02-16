import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeletePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePost", {
      type: "String",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (_, { postId }, { prisma, currentUser }: Context, x) => {
        await prisma.post.delete({
          where: {
            id: postId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return "deleted";
      },
    });
  },
});
