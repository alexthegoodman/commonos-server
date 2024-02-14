import { PrismaClient, User } from "@prisma/client";
import MixpanelClient from "./helpers/mixpanel";

import algoliasearch, { SearchClient } from "algoliasearch";
import OpenAI from "openai";
import prisma from "./prisma";
import AWS_SES from "./helpers/AWS_SES";

const openai = new OpenAI({
  organization: "org-27u0QhfhY8rWqMDmiUBdRw6E",
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const mixpanel = new MixpanelClient();

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_SERVER_API_KEY as string
);

const awsSES = new AWS_SES();

export interface Context {
  prisma: PrismaClient;
  mixpanel: MixpanelClient;
  req: any;
  currentUser: User;
  openai: OpenAI;
  algolia: SearchClient;
  awsSES: AWS_SES;
}

export const context = {
  prisma,
  mixpanel,
  openai,
  algolia,
  awsSES,
};
