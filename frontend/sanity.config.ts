import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "neulsw-blog",
  title: "늘품한의원 블로그",
  basePath: "/admin/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hlql019b",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
