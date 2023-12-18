import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateFileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFile", {
      type: "String",
      args: {
        prompt: nonNull(stringArg()),
        flowId: nonNull(stringArg()),
        fileId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { prompt, flowId, fileId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const flow = await prisma.flow.findFirst({
          where: {
            id: flowId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        if (!flow) {
          throw new Error("Flow not found");
        }

        const fileData = flow?.questionsContext?.files?.find(
          (file) => file.id === fileId
        );

        const folderName = prompt.substr(0, 80) + "...";

        console.info("createFile", fileData, folderName);

        return "SUCCESS";
      },
    });
  },
});
