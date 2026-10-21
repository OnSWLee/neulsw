import { sanityServerClient } from "../../lib/sanityNext";
import type { RelatedPost } from "../../components/RelatedPosts";

export async function fetchClinicPosts(clinic: "herbs" | "spine") {
  try {
    const posts = await sanityServerClient.fetch<RelatedPost[]>(
      `*[_type == "blogPost" && clinic == $clinic && defined(slug.current) && (!defined(postType) || postType == "blog")] | order(publishedAt desc)[0...3] {
        _id, title, excerpt, author, publishedAt, mainImage, slug
      }`,
      { clinic }
    );
    return posts ?? [];
  } catch {
    return [];
  }
}
