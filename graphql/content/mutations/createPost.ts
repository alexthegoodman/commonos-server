import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        postTypeId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const newPost = await prisma.post.create({
          data: {
            title: "New Draft Post",
            published: false,
            markdown: "",
            type: {
              connect: {
                id: postTypeId,
              },
            },
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newPost", newPost);

        return newPost;
      },
    });
  },
});
