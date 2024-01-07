import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyFeedsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myFeeds", {
      type: "Feed",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const feeds = await prisma.feed.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return feeds;
      },
    });
  },
});
