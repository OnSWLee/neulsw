import Link from "next/link";
import { urlFor } from "../lib/sanityNext";

export type RelatedPost = {
  _id: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  mainImage?: unknown;
  slug: { current: string };
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="border-t border-slate-200 bg-white px-6 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">관련 글</h2>
          <Link href="/blog" className="tot-link">
            블로그 전체 보기 →
          </Link>
        </div>
        <div className="stagger-fade-in mt-8 divide-y divide-slate-200 border-t border-slate-200">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current.trim()}`}
              className="group flex flex-col-reverse gap-5 py-8 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 text-xs uppercase tracking-[0.15em] text-slate-500">
                  <span>{post.author || "관리자"}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary-700 md:text-2xl">
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-600">{post.excerpt}</p>
                ) : null}
              </div>
              {post.mainImage ? (
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 sm:w-44">
                  <img
                    src={urlFor(post.mainImage).width(480).height(360).url()}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
