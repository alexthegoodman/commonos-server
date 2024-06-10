import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

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
        console.info("test upload sync", fileName, filePath, fileData);

        return "success";
      },
    });
  },
});
