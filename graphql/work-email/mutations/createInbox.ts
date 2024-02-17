import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateInboxMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createInbox", {
      type: "Inbox",
      args: {
        username: nonNull(stringArg()),
      },
      resolve: async (_, { username }, { prisma, currentUser }: Context, x) => {
        const domainSettings = await prisma.domainSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        const newInbox = await prisma.inbox.create({
          data: {
            username,
            domain: {
              connect: {
                id: domainSettings?.id,
              },
            },
          },
        });

        console.info("newInbox", newInbox);

        return newInbox;
      },
    });
  },
});
