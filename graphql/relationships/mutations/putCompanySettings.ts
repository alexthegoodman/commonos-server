import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PutCompanySettingsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("putCompanySettings", {
      type: "String",
      args: {
        fields: nonNull(stringArg()),
      },
      resolve: async (_, { fields }, { prisma, currentUser }: Context, x) => {
        const existingSettings = await prisma.companySettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        let putData = {};

        if (fields) putData = { ...putData, fields: JSON.parse(fields) };

        if (existingSettings) {
          await prisma.companySettings.update({
            where: {
              id: existingSettings.id,
            },
            data: putData,
          });
        } else {
          await prisma.companySettings.create({
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
