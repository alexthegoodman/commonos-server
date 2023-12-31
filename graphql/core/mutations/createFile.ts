import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import OpenAIClient from "../../../helpers/OpenAI";
import {
  getDocumentContent,
  getImageContent,
  getPresentationContent,
  getSheetContent,
} from "../../../prompts/getFileContent";
import { v4 as uuidv4 } from "uuid";

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
            const documentPrompt = getDocumentContent(
              fileData.name,
              fileData.questions
            );
            const documentContent = await openaiClient.makeCompletion(
              documentPrompt,
              1.2,
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

            const newDocumentTree = currentUser.documentTree || [];
            const existingFolder = newDocumentTree?.find(
              (folder) => folder?.generatedName === folderName
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
            const presentationPrompt = getPresentationContent(
              fileData.name,
              fileData.questions
            );
            const presentationContent = await openaiClient.makeCompletion(
              presentationPrompt,
              1.5,
              "json_object"
            );

            const presentationContext = {
              slides: [
                {
                  id: uuidv4(),
                  title: fileData.name,
                  texts: [
                    {
                      id: uuidv4(),
                      content: fileData.name,
                      x: 0,
                      y: 250,
                      width: 1000,
                      fontSize: 24,
                      fontStyle: "normal",
                      fontFamily: "Arial",
                      fontVariant: "normal",
                      fill: "black",
                      align: "center",
                      lineHeight: 1.35,
                    },
                  ],
                  shapes: [],
                  images: [],
                },
                ...presentationContent.slides.map((slide) => ({
                  id: uuidv4(),
                  title: slide.title,
                  texts: [
                    {
                      id: uuidv4(),
                      content: slide.content,
                      x: 150,
                      y: 250,
                      width: 700,
                      fontSize: 24,
                      fontStyle: "normal",
                      fontFamily: "Arial",
                      fontVariant: "normal",
                      fill: "black",
                      align: "left",
                      lineHeight: 1.35,
                    },
                  ],
                  shapes: [],
                  images: [],
                })),
              ],
            };

            const newPresentation = await prisma.presentation.create({
              data: {
                title: fileData.name,
                context: presentationContext,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            const newPresentationFiles = currentUser.presentationFiles || [];
            const existingPresentationFolder = newPresentationFiles?.find(
              (folder) => folder.folderTitle === folderName
            );
            const newPresentationNode = {
              id: newPresentation.id,
              type: "file",
            };

            if (existingPresentationFolder) {
              existingPresentationFolder.files.push(newPresentationNode);
            } else {
              newPresentationFiles.push({
                id: uuidv4(),
                folderTitle: folderName,
                files: [newPresentationNode],
                type: "folder",
                folderCreatedAt: new Date().toISOString(),
              });
            }

            await prisma.user.update({
              where: {
                id: currentUser.id,
              },
              data: {
                presentationFiles: newPresentationFiles,
              },
            });

            break;
          case "sheets":
            const sheetPrompt = getSheetContent(
              fileData.name,
              fileData.questions
            );
            const sheetContent = await openaiClient.makeCompletion(
              sheetPrompt,
              1.5,
              "json_object"
            );

            const numColumns = Object.keys(sheetContent.rows[0]).length;
            const sheetContext = {
              columns: Array.from(Array(numColumns).keys()).map((i) => ({
                columnId: uuidv4(),
                width: 200,
                reorderable: true,
                resizable: true,
              })),
              rows: sheetContent.rows.map((row) => ({
                rowId: uuidv4(),
                height: 30,
                reorderable: true,
                cells: Object.keys(row).map((key, i) => {
                  if (i < numColumns) {
                    return {
                      type: "text",
                      text: row[key],
                    };
                  }
                }),
              })),
            };

            const newSheet = await prisma.sheet.create({
              data: {
                title: fileData.name,
                context: sheetContext,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            const newSheetFiles = currentUser.sheetFiles || [];
            const existingSheetFolder = newSheetFiles?.find(
              (folder) => folder.folderTitle === folderName
            );
            const newSheetNode = {
              id: newSheet.id,
              type: "file",
            };

            if (existingSheetFolder) {
              existingSheetFolder.files.push(newSheetNode);
            } else {
              newSheetFiles.push({
                id: uuidv4(),
                folderTitle: folderName,
                files: [newSheetNode],
                type: "folder",
                folderCreatedAt: new Date().toISOString(),
              });
            }

            await prisma.user.update({
              where: {
                id: currentUser.id,
              },
              data: {
                sheetFiles: newSheetFiles,
              },
            });

            break;
          case "images":
            const imagePrompt = getImageContent(
              fileData.name,
              fileData.questions
            );
            const imageBlob = await openaiClient.makeImage(imagePrompt);

            const drawingContext = {
              lines: [],
              images: [
                {
                  id: uuidv4(),
                  imageUrl: imageBlob.url,
                  x: 0,
                  y: 0,
                  width: 1000,
                  height: 1000,
                },
              ],
            };

            const newDrawing = await prisma.drawing.create({
              data: {
                title: fileData.name,
                context: drawingContext,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            const newDrawingFiles = currentUser.drawingFiles || [];
            const existingDrawingFolder = newDrawingFiles?.find(
              (folder) => folder.folderTitle === folderName
            );
            const newDrawingNode = {
              id: newDrawing.id,
              type: "file",
            };

            if (existingDrawingFolder) {
              existingDrawingFolder.files.push(newDrawingNode);
            } else {
              newDrawingFiles.push({
                id: uuidv4(),
                folderTitle: folderName,
                files: [newDrawingNode],
                type: "folder",
                folderCreatedAt: new Date().toISOString(),
              });
            }

            await prisma.user.update({
              where: {
                id: currentUser.id,
              },
              data: {
                drawingFiles: newDrawingFiles,
              },
            });

            break;
          default:
            throw new Error("Invalid app");
        }

        return "SUCCESS";
      },
    });
  },
});
