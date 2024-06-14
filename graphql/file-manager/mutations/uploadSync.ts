import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import AWS_S3 from "../../../helpers/AWS_S3";

import { v4 as uuidv4 } from "uuid";

export const UploadSyncMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("uploadSync", {
      type: "String",
      args: {
        fileName: nonNull(stringArg()),
        filePath: nonNull(stringArg()),
        // fileSize: nullable(intArg()),
        // fileType: nullable(stringArg()),
        fileData: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { fileName, filePath, fileData },
        { prisma, currentUser, broadcastToGroup }: Context,
        x
      ) => {
        const awsS3 = new AWS_S3();

        console.info("being upload sync");

        let fileFormat = fileName.split(".")[1];
        let normalFilePath = filePath.replace(/\\/g, "/");
        let projectId = normalFilePath.split("/")[2];
        let category = normalFilePath.split("/")[3];
        let fileKey = "native/" + currentUser.id + "/" + normalFilePath + "/";

        console.info(
          "uploadSync",
          fileFormat,
          fileName,
          filePath,
          fileKey,
          projectId
        );

        let contentType = "image";
        let fileType = "image/png";

        if (fileFormat === "glb") {
          contentType = "model";
          fileType = "model/gltf-binary";
        }

        if (fileFormat === "tif") {
          contentType = "image";
          fileType = "image/tiff";
        }

        const cloudfrontUrl = await awsS3.uploadAsset(
          contentType,
          fileName,
          fileType,
          1000, // hardcode for testing (fileSize)
          fileData,
          false,
          fileKey
        );

        if (!cloudfrontUrl) {
          throw Error("Could not get cloudfront url");
        }

        console.info("saving context...");

        // update projectId project to include this concept or model
        const currentProject = await prisma.mdProject.findUnique({
          where: {
            id: projectId,
          },
        });

        let defaultContext = currentProject?.context
          ? (currentProject.context as any)
          : {
              concepts: [],
              models: [],
              landscapes: [],
            };

        if (category === "concepts") {
          await prisma.mdProject.update({
            where: {
              id: projectId,
            },
            data: {
              context: {
                ...defaultContext,
                concepts: [
                  ...defaultContext.concepts,
                  {
                    id: uuidv4(),
                    fileName,
                    cloudfrontUrl,
                    normalFilePath,
                  },
                ],
              },
            },
          });
        } else if (category === "models") {
          await prisma.mdProject.update({
            where: {
              id: projectId,
            },
            data: {
              context: {
                ...defaultContext,
                models: [
                  ...defaultContext.models,
                  {
                    id: uuidv4(),
                    fileName,
                    cloudfrontUrl,
                    normalFilePath,
                  },
                ],
              },
            },
          });
        } else if (category === "landscapes") {
          await prisma.mdProject.update({
            where: {
              id: projectId,
            },
            data: {
              context: {
                ...defaultContext,
                landscapes: [
                  ...(defaultContext.landscapes
                    ? defaultContext.landscapes
                    : []),
                  {
                    id: uuidv4(),
                    fileName,
                    cloudfrontUrl,
                    normalFilePath,
                  },
                ],
              },
            },
          });
        }

        console.info("broadcast to group...");

        // send event to projectId socket group to refresh context
        broadcastToGroup(
          projectId,
          JSON.stringify({ command: "refreshContext" })
        );

        return cloudfrontUrl;
      },
    });
  },
});
