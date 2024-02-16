import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PostTypeQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("postType", {
      type: "PostType",
      args: {
        postTypeId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const postType = await prisma.postType.findUnique({
          where: {
            id: postTypeId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return postType;
      },
    });
  },
});
