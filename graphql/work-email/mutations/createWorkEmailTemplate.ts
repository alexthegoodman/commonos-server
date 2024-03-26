import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateWorkEmailTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createWorkEmailTemplate", {
      type: "WorkEmailTemplate",
      args: {
        folderId: nonNull(stringArg()),
        subject: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { folderId, subject, body },
        { prisma, currentUser }: Context,
        x
      ) => {
        const newTemplate = await prisma.workEmailTemplate.create({
          data: {
            subject,
            body,
            workEmailFolder: {
              connect: {
                id: folderId,
              },
            },
          },
        });

        console.info("newTemplate", newTemplate);

        return newTemplate;
      },
    });
  },
});
