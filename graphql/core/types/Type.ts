import { objectType } from "nexus";
import { Context } from "../../../context";

export const TypeType = objectType({
  name: "Type",
  definition(t) {
    // PRIVATE: ...
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });
    t.field("code", { type: "String" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
