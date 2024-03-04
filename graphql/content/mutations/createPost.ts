import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        postTypeId: nonNull(stringArg()),
        title: nonNull(stringArg()),
        markdown: nonNull(stringArg()),
        fields: nullable(stringArg()),
      },
      resolve: async (
        _,
        { postTypeId, title, markdown, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        const newPost = await prisma.post.create({
          data: {
            title,
            published: false,
            markdown,
            fields: fields ? JSON.parse(fields) : undefined,
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
