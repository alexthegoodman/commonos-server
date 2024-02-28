import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreatePostTypeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPostType", {
      type: "PostType",
      args: {
        name: nonNull(stringArg()),
        fields: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { name, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        const newPostType = await prisma.postType.create({
          data: {
            name,
            fields: JSON.parse(fields),
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newPostType", newPostType);

        return newPostType;
      },
    });
  },
});
