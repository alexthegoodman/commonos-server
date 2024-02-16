import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePost", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
        title: nullable(stringArg()),
        markdown: nullable(stringArg()),
        fields: nullable(stringArg()),
      },
      resolve: async (
        _,
        { postId, title, markdown, fields },
        { prisma, currentUser }: Context,
        x
      ) => {
        let saveData = {} as any;
        if (title) {
          saveData.title = title;
        }
        if (markdown) {
          saveData.markdown = markdown;
        }
        if (fields) {
          saveData.fields = JSON.parse(fields);
        }

        const updatedPost = await prisma.post.update({
          where: {
            id: postId,
            creator: {
              id: currentUser.id,
            },
          },
          data: saveData,
        });

        console.info("updatedPost", updatedPost);

        return updatedPost;
      },
    });
  },
});
