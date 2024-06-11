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
        { prisma, currentUser }: Context,
        x
      ) => {
        const awsS3 = new AWS_S3();

        let fileFormat = fileName.split(".")[1];
        let normalFilePath = filePath.replace(/\\\\/g, "/");
        let projectId = normalFilePath.split("/")[0];
        let fileKey = "native/" + currentUser.id + "/" + normalFilePath;

        console.info(
          "uploadSync",
          fileFormat,
          fileName,
          filePath,
          fileKey,
          projectId
        );

        const cloudfrontUrl = await awsS3.uploadAsset(
          "image", // hardcode for testing
          fileName,
          "image/jpeg", // fileType
          1000, // fileSize
          fileData,
          false,
          fileKey
        );

        if (!cloudfrontUrl) {
          throw Error("Could not get cloudfront url");
        }

        // update projectId project to include this concept or model
        const currentProject = await prisma.mdProject.findUnique({
          where: {
            id: projectId,
          },
        });

        let defaultContext = currentProject?.context
          ? (currentProject.context as any)
          : {};

        if (fileFormat === "jpg") {
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
        } else if (fileFormat === "glb") {
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
        }

        // TODO: send event to projectId socket group to refresh context

        return cloudfrontUrl;
      },
    });
  },
});
