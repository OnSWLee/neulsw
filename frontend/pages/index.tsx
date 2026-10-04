import type { GetStaticProps } from "next";
import Home, { type HomeBlogPost } from "../src/pages/Home";
import SeoHead from "../components/SeoHead";
import { sanityServerClient } from "../lib/sanityNext";
import { medicalClinicJsonLd, websiteJsonLd } from "../src/lib/seo";
import { SITE } from "../src/lib/site";

type Props = {
  posts: HomeBlogPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await sanityServerClient.fetch<HomeBlogPost[]>(
      `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...3] {
        _id, title, excerpt, author, publishedAt, mainImage, slug
      }`
    );
    return { props: { posts: posts ?? [] }, revalidate: 60 };
  } catch {
    return { props: { posts: [] }, revalidate: 60 };
  }
};

export default function HomePage({ posts }: Props) {
  return (
    <>
      <SeoHead
        title={`${SITE.name} | 수원 생약·척추관절 한의원`}
        description={SITE.defaultDescription}
        path="/"
        jsonLd={[medicalClinicJsonLd(), websiteJsonLd()]}
      />
      <Home posts={posts} />
    </>
  );
}
