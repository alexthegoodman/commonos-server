import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import OpenAIClient from "../../../helpers/OpenAI";
import { getDocumentContent } from "../../../prompts/getFileContent";

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
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        const openaiClient = new OpenAIClient(openai, prisma, currentUser);

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

        // generate content
        // add content to context of new db entry
        // add to folder / tree structure (with id)

        switch (fileData?.app) {
          case "documents":
            const contentPrompt = getDocumentContent(
              fileData.name,
              fileData.questions
            );
            const documentContent = await openaiClient.makeCompletion(
              contentPrompt,
              1.5,
              "text"
            );

            const newDocument = await prisma.document.create({
              data: {
                title: fileData.name,
                plaintext: documentContent,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            const newDocumentTree = currentUser.documentTree;
            const existingFolder = newDocumentTree?.find(
              (folder) => folder.generatedName === folderName
            );
            const newDocNode = {
              id: newDocument.id,
              folded: true,
              children: [],
            };

            if (existingFolder) {
              existingFolder.children.push(newDocNode);
            } else {
              const newFolder = await prisma.document.create({
                data: {
                  title: folderName,
                  creator: {
                    connect: {
                      id: currentUser.id,
                    },
                  },
                },
              });

              newDocumentTree.push({
                id: newFolder.id,
                folded: false,
                generatedName: folderName,
                children: [newDocNode],
              });
            }

            await prisma.user.update({
              where: {
                id: currentUser.id,
              },
              data: {
                documentTree: newDocumentTree,
              },
            });

            break;
          case "slides":
            break;
          case "sheets":
            break;
          case "images":
            break;
          default:
            throw new Error("Invalid app");
        }

        return "SUCCESS";
      },
    });
  },
});
