import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdatePostTypeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePostType", {
      type: "Post",
      args: {
        postTypeId: nonNull(stringArg()),
        name: nullable(stringArg()),
        fields: nullable(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId, name, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        let saveData = {} as any;
        if (name) {
          saveData.name = name;
        }
        if (fields) {
          saveData.fields = JSON.parse(fields);
        }

        const updatedPostType = await prisma.postType.update({
          where: {
            id: postTypeId,
            creator: {
              id: currentUser.id,
            },
          },
          data: saveData,
        });

        console.info("updatedPostType", updatedPostType);

        return updatedPostType;
      },
    });
  },
});
