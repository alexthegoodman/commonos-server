import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreatePostTypeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPostType", {
      type: "Post",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newPostType = await prisma.postType.create({
          data: {
            name: "New Post Type",
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
