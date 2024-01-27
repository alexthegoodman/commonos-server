import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";

const jsonScalar = asNexusMethod(JSONResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as coreTypes from "./graphql/core";
import * as documentsTypes from "./graphql/documents";
import * as drawingsTypes from "./graphql/drawings";
import * as presentationsTypes from "./graphql/presentations";
import * as sheetsTypes from "./graphql/sheets";
import * as soundsTypes from "./graphql/sounds";
import * as videosTypes from "./graphql/videos";
import * as rssTypes from "./graphql/rss";
import * as collaborationTypes from "./graphql/collaboration";
import * as relationshipsTypes from "./graphql/relationships";

import { permissions } from "./permissions";

export const schema = makeSchema({
  types: [
    coreTypes,
    documentsTypes,
    drawingsTypes,
    presentationsTypes,
    sheetsTypes,
    soundsTypes,
    videosTypes,
    rssTypes,
    collaborationTypes,
    relationshipsTypes,
    jsonScalar,
    dateTimeScalar,
  ],
  outputs: {
    typegen: join(__dirname, ".", "nexus-typegen.ts"),
    schema: join(__dirname, ".", "schema.graphql"),
  },
  // shouldExitAfterGenerateArtifacts: true,
});

export const protectedSchema = applyMiddleware(schema, permissions);
