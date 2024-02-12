import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateEmailTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createEmailTemplate", {
      type: "EmailTemplate",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newEmailTemplate = await prisma.emailTemplate.create({
          data: {
            title: "New Email Template",
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newEmailTemplate", newEmailTemplate);

        return newEmailTemplate;
      },
    });
  },
});
