import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const SendWorkEmailMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("sendWorkEmail", {
      type: "Email",
      args: {
        threadId: nonNull(stringArg()),
        to: nonNull(stringArg()),
        subject: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { threadId, to, subject, body },
        { prisma, currentUser, awsSES }: Context,
        x
      ) => {
        const emailResponse = await awsSES.sendEmail(
          currentUser.email,
          to,
          subject,
          body
        );

        console.info("emailResponse", emailResponse);

        if (!emailResponse || !emailResponse.MessageId) {
          throw new Error("Failed to send email");
        }

        const newEmail = await prisma.email.create({
          data: {
            from: currentUser.email,
            to,
            subject,
            body,
            thread: {
              connect: {
                id: threadId,
              },
            },
            sesMessageId: emailResponse.MessageId,
          },
        });

        console.info("newEmail", newEmail);

        return newEmail;
      },
    });
  },
});
