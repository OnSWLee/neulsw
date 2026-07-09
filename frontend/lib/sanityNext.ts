import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  "hlql019b";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  "production";

const apiVersion = "2024-01-01";

/** 빌드/ISR용: CDN 없이 최신 데이터 조회 */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

/** 클라이언트 이미지 URL 생성용 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: unknown) => builder.image(source as any);
