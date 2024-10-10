import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: "User",
      args: {
        documentTree: nullable(stringArg()),
        presentationFiles: nullable(stringArg()),
        sheetFiles: nullable(stringArg()),
        drawingFiles: nullable(stringArg()),
        soundFiles: nullable(stringArg()),
        videoFiles: nullable(stringArg()),
        feedTree: nullable(stringArg()),
        launcherContext: nullable(stringArg()),
      },
      resolve: async (
        _,
        {
          documentTree,
          presentationFiles,
          sheetFiles,
          drawingFiles,
          soundFiles,
          videoFiles,
          feedTree,
          launcherContext,
        },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updateData = {} as any;

        if (documentTree) updateData.documentTree = JSON.parse(documentTree);
        if (presentationFiles)
          updateData.presentationFiles = JSON.parse(presentationFiles);
        if (sheetFiles) updateData.sheetFiles = JSON.parse(sheetFiles);
        if (drawingFiles) updateData.drawingFiles = JSON.parse(drawingFiles);
        if (soundFiles) updateData.soundFiles = JSON.parse(soundFiles);
        if (videoFiles) updateData.videoFiles = JSON.parse(videoFiles);
        if (feedTree) updateData.feedTree = JSON.parse(feedTree);
        if (launcherContext)
          updateData.launcherContext = JSON.parse(launcherContext);

        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: updateData,
        });

        return updatedUser;
      },
    });
  },
});
