import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import OpenAIClient from "../../../helpers/OpenAI";
import {
  getContentContent,
  getContentIntro,
  getDocumentContent,
  getImageContent,
  getPresentationContent,
  getSheetContent,
  getWorkEmailContent,
} from "../../../prompts/getFileContent";
import { v4 as uuidv4 } from "uuid";
import AI_Controller from "../../../helpers/AI_Controller";
import {
  getContentOutline,
  getDocumentOutline,
} from "../../../prompts/getQuestions";

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
        // const openaiClient = new OpenAIClient(openai, prisma, currentUser);
        const aiClient = new AI_Controller(openai, prisma, currentUser);
        const model = "gpt";

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

        const { files } = flow?.questionsContext as any;

        const fileData = files?.find((file) => file.id === fileId);

        const folderName = prompt.substr(0, 80) + "...";
        const shortFolderName = prompt.substr(0, 30) + "...";

        console.info("createFile", fileData, folderName);

        // generate content
        // add content to context of new db entry
        // add to folder / tree structure (with id)

        switch (fileData?.app) {
          case "documents": {
            let completeDocument = "";

            const outlineContent = getDocumentOutline(fileData.name);
            const outlineJson = await aiClient.makeCompletion(
              model,
              outlineContent
            );

            for (let i = 0; i < outlineJson.sections.length; i++) {
              const section = outlineJson.sections[i];
              const documentPrompt = getDocumentContent(
                fileData.name,
                fileData.questions,
                fileData.background,
                section
              );
              const documentContent = await aiClient.makeCompletion(
                model,
                documentPrompt,
                1.2,
                "text"
              );
              completeDocument +=
                "\n\n" + "# " + section + "\n" + documentContent;
            }

            // const documentPrompt = getDocumentContent(
            //   fileData.name,
            //   fileData.questions,
            //   fileData.background
            // );
            // const documentContent = await aiClient.makeCompletion(
            //   model,
            //   documentPrompt,
            //   1.2,
            //   "text"
            // );

            const newDocument = await prisma.document.create({
              data: {
                title: fileData.name,
                plaintext: completeDocument,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            const newDocumentTree = currentUser.documentTree || ([] as any);
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
          }
          case "slides":
            const presentationPrompt = getPresentationContent(
              fileData.name,
              fileData.questions,
              fileData.background
            );
            const presentationContent = await aiClient.makeCompletion(
              model,
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

            const newPresentationFiles =
              currentUser.presentationFiles || ([] as any);
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
              fileData.questions,
              fileData.background
            );
            const sheetContent = await aiClient.makeCompletion(
              model,
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

            const newSheetFiles = currentUser.sheetFiles || ([] as any);
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
          case "images" || "drawings":
            const imagePrompt = getImageContent(
              fileData.name,
              fileData.questions,
              fileData.background
            );
            const imageBlob = await aiClient.makeImage(model, imagePrompt);

            if (!imageBlob) {
              throw new Error("No image blob");
            }

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

            const newDrawingFiles = currentUser.drawingFiles || ([] as any);
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
          case "content": {
            // const contentPrompt = getContentContent(
            //   fileData.name,
            //   fileData.questions,
            //   fileData.background
            // );
            // const contentContent = await aiClient.makeCompletion(
            //   model,
            //   contentPrompt,
            //   1.2, // may need to be 1.2 to avoid gibberish
            //   "text"
            // );

            let completeDocument = "";

            const outlineContent = getContentOutline(fileData.name);
            const outlineJson = await aiClient.makeCompletion(
              model,
              outlineContent
            );

            // sequential version
            const previousMessages = [] as any;
            for (let i = 0; i < outlineJson.sections.length; i++) {
              const section = outlineJson.sections[i];
              const isFirstSection = i === 0;

              if (isFirstSection) {
                const introPrompt = getContentIntro(
                  fileData.name,
                  fileData.questions,
                  fileData.background
                );
                const introContent = await aiClient.makeCompletion(
                  model,
                  introPrompt,
                  1.2,
                  "text"
                );
                completeDocument += introContent;
                previousMessages.push({
                  content: introPrompt,
                  role: "user",
                });
                previousMessages.push({
                  content: introContent,
                  role: "assistant",
                });
              } else {
                const documentPrompt = getContentContent(section);
                const documentContent = await aiClient.makeCompletion(
                  model,
                  documentPrompt,
                  1.2,
                  "text",
                  previousMessages
                );
                completeDocument +=
                  "\n\n" + "# " + section + "\n" + documentContent;
                previousMessages.push({
                  content: documentPrompt,
                  role: "user",
                });
                previousMessages.push({
                  content: documentContent,
                  role: "assistant",
                });
              }
            }

            let existingPostType = await prisma.postType.findFirst({
              where: {
                name: shortFolderName,
                creator: {
                  id: currentUser.id,
                },
              },
            });

            if (!existingPostType) {
              existingPostType = await prisma.postType.create({
                data: {
                  name: shortFolderName,
                  creator: {
                    connect: {
                      id: currentUser.id,
                    },
                  },
                },
              });
            }

            const newPost = await prisma.post.create({
              data: {
                title: fileData.name,
                type: {
                  connect: {
                    id: existingPostType.id,
                  },
                },
                markdown: completeDocument,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
              },
            });

            break;
          }
          case "work-email":
            const emailPrompt = getWorkEmailContent(
              fileData.name,
              fileData.questions,
              fileData.background
            );
            const emailContent = await aiClient.makeCompletion(
              model,
              emailPrompt,
              1.5,
              "text"
            );

            const domainSettings = await prisma.domainSettings.findFirst({
              where: {
                user: {
                  id: currentUser.id,
                },
              },
            });

            const firstInbox = await prisma.inbox.findFirst({
              where: {
                domain: {
                  id: domainSettings?.id,
                },
              },
            });

            if (!firstInbox) {
              throw new Error("No inbox found");
            }

            const newThread = await prisma.thread.create({
              data: {
                subject: fileData.name,
                inbox: {
                  connect: {
                    id: firstInbox.id,
                  },
                },
              },
            });

            const newEmail = await prisma.email.create({
              data: {
                from: firstInbox.username + "@" + domainSettings?.domainName,
                to: "",
                subject: fileData.name,
                body: "",
                initialMarkdown: emailContent,
                sesMessageId: uuidv4(),
                draft: true,
                thread: {
                  connect: {
                    id: newThread.id,
                  },
                },
              },
            });

            break;
          case "relationships":
            // no content yet, just dynamic title for now :(
            const newDashboard = await prisma.dashboard.create({
              data: {
                title: fileData.name,
                creator: {
                  connect: {
                    id: currentUser.id,
                  },
                },
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
