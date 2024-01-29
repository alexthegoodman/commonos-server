import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PutContactSettingsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("putContactSettings", {
      type: "String",
      args: {
        fields: nonNull(stringArg()),
      },
      resolve: async (_, { fields }, { prisma, currentUser }: Context, x) => {
        const existingSettings = await prisma.contactSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        let putData = {};

        if (fields) putData = { ...putData, fields: JSON.parse(fields) };

        if (existingSettings) {
          await prisma.contactSettings.update({
            where: {
              id: existingSettings.id,
            },
            data: putData,
          });
        } else {
          await prisma.contactSettings.create({
            data: {
              user: {
                connect: {
                  id: currentUser.id,
                },
              },
              ...putData,
            },
          });
        }

        return "success";
      },
    });
  },
});
