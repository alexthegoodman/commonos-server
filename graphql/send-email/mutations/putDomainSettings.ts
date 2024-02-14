import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PutDomainSettingsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("putDomainSettings", {
      type: "DomainSettings",
      args: {
        domainName: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { domainName },
        { prisma, currentUser, awsSES }: Context,
        x
      ) => {
        const existingSettings = await prisma.domainSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        if (existingSettings) {
          // NOTE: should not be able to update domain name at this time
          // will implement ability to delete current domain and add new one later
          // let dkimData = [];
          // await prisma.domainSettings.update({
          //   where: {
          //     id: existingSettings.id,
          //   },
          //   data: {
          //     dkimData,
          //   },
          // });
        } else {
          // fetch dkim data from aws ses
          const dkimData = await awsSES.createEmailIdentity(domainName);

          await prisma.domainSettings.create({
            data: {
              user: {
                connect: {
                  id: currentUser.id,
                },
              },
              domainName,
              dkimData,
            },
          });
        }

        const updatedSettings = await prisma.domainSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        return updatedSettings;
      },
    });
  },
});
