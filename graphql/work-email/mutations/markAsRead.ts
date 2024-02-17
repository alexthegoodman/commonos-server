import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { v4 as uuidv4 } from "uuid";

export const MarkAsReadMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("markAsRead", {
      type: "Email",
      args: {
        emailId: nonNull(stringArg()),
      },
      resolve: async (_, { emailId }, { prisma, currentUser }: Context, x) => {
        const updatedEmail = await prisma.email.update({
          where: {
            id: emailId,
          },
          data: {
            unread: false,
          },
        });

        console.info("updatedEmail", updatedEmail);

        return updatedEmail;
      },
    });
  },
});
