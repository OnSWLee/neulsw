import type { GetStaticProps } from "next";
import Link from "next/link";
import SeoHead from "../../components/SeoHead";
import { sanityServerClient, urlFor } from "../../lib/sanityNext";

type BlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  mainImage?: unknown;
  slug: { current: string };
};

type Props = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, excerpt, author, publishedAt, mainImage, slug
  }`;

  const posts = await sanityServerClient.fetch<BlogPost[]>(query);

  return {
    props: { posts: posts ?? [] },
    revalidate: 60,
  };
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage({ posts }: Props) {
  return (
    <>
      <SeoHead
        title="블로그"
        description="경희늘품한의원 블로그 — 생약·면역·척추관절 임상과 건강 정보를 공유합니다."
        path="/blog"
      />
      <div className="min-h-screen bg-white">
        <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
          <p className="tot-eyebrow">생약·면역·척추관절 임상과 건강 정보를 공유합니다.</p>
          <h1 className="tot-title mt-4">Blog</h1>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="py-16 text-center font-serif text-slate-500">작성된 블로그 글이 없습니다.</p>
          ) : (
            <div className="stagger-fade-in divide-y divide-slate-200">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col-reverse gap-6 py-10 first:pt-0 md:flex-row md:items-center md:gap-10"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 text-xs uppercase tracking-[0.15em] text-slate-500">
                      <span>{post.author || "관리자"}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary-700 md:text-3xl">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="tot-link mt-5">더 읽기 →</span>
                  </div>
                  {post.mainImage ? (
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 md:w-64">
                      <img
                        src={urlFor(post.mainImage).width(640).height(480).url()}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
