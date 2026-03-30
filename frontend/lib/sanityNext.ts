import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.VITE_SANITY_PROJECT_ID ||
    "hlql019b",
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.VITE_SANITY_DATASET ||
    "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: unknown) => builder.image(source as any);
