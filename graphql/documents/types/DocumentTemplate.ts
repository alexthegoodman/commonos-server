import { objectType } from "nexus";
import { Context } from "../../../context";

export const DocumentTemplateType = objectType({
  name: "DocumentTemplate",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("sourceId", { type: "String" });
    t.field("title", { type: "String" });
    t.field("key", { type: "String" });
    t.field("masterVisuals", { type: "JSON" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
