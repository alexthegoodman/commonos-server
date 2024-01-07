import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const NewFeedMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newFeed", {
      type: "Feed",
      args: {
        url: nonNull(stringArg()),
      },
      resolve: async (_, { url }, { prisma, currentUser }: Context, x) => {
        const newFeed = await prisma.feed.create({
          data: {
            url,
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newFeed", newFeed);

        return newFeed;
      },
    });
  },
});
