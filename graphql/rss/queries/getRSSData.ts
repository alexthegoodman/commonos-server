import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import Parser from "rss-parser";

export const GetRSSDataQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getRSSData", {
      type: "JSON",
      args: {
        url: nonNull(stringArg()),
      },
      resolve: async (_, { url }, { prisma, currentUser }: Context, x) => {
        const parser = new Parser();
        const feed = (await parser.parseURL(url)) as any;

        return feed;
      },
    });
  },
});
