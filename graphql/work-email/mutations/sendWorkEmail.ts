import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import e from "cors";
import DOMPurify from "isomorphic-dompurify";
import { v4 as uuidv4 } from "uuid";

export const SendWorkEmailMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("sendWorkEmail", {
      type: "Email",
      args: {
        inboxId: nonNull(stringArg()),
        threadId: nullable(stringArg()),
        to: nonNull(stringArg()),
        subject: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { inboxId, threadId, to, subject, body },
        { prisma, currentUser, awsSES }: Context,
        x
      ) => {
        const relatedInbox = await prisma.inbox.findUnique({
          where: {
            id: inboxId,
          },
        });

        if (!relatedInbox) {
          throw new Error("Inbox not found");
        }

        const relatedDomain = await prisma.domainSettings.findUnique({
          where: {
            id: relatedInbox.domainId,
          },
        });

        if (!relatedDomain) {
          throw new Error("Domain not found");
        }

        const from = relatedInbox.username + "@" + relatedDomain.domainName;
        const sanitizedBody = DOMPurify.sanitize(body);

        // const emailResponse = await awsSES.sendEmail(
        //   from,
        //   to,
        //   subject,
        //   sanitizedBody
        // );

        // console.info("emailResponse", emailResponse);

        // if (!emailResponse || !emailResponse.MessageId) {
        //   throw new Error("Failed to send email");
        // }

        let thread = null as any;
        if (threadId) {
          thread = await prisma.thread.findUnique({
            where: {
              id: threadId,
            },
          });
        } else {
          thread = await prisma.thread.create({
            data: {
              subject,
              inbox: {
                connect: {
                  id: inboxId,
                },
              },
            },
          });
        }

        const newEmail = await prisma.email.create({
          data: {
            from,
            to,
            subject,
            body: sanitizedBody,
            thread: {
              connect: {
                id: thread.id,
              },
            },
            // sesMessageId: emailResponse.MessageId,
            sesMessageId: uuidv4(),
          },
        });

        console.info("newEmail", newEmail);

        return newEmail;
      },
    });
  },
});
