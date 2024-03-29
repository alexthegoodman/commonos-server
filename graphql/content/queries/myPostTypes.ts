import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyPostTypesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myPostTypes", {
      type: "PostType",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const postTypes = await prisma.postType.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return postTypes;
      },
    });
  },
});
