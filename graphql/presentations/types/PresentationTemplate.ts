import { objectType } from "nexus";
import { Context } from "../../../context";

export const PresentationTemplateType = objectType({
  name: "PresentationTemplate",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("sourceId", { type: "String" });
    t.field("title", { type: "String" });
    t.field("key", { type: "String" });
    t.field("context", { type: "JSON" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
