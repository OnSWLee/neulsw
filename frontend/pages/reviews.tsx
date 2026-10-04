import type { GetStaticProps } from "next";
import Link from "next/link";
import SeoHead from "../components/SeoHead";
import { sanityClient, urlFor } from "../lib/sanityNext";

type Review = {
  _id: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  mainImage?: unknown;
  slug: { current: string };
};

type Props = {
  reviews: Review[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = `*[_type == "blogPost" && postType == "review"] | order(publishedAt desc) {
    _id, title, excerpt, author, publishedAt, mainImage, slug
  }`;
  const reviews = await sanityClient.fetch<Review[]>(query);

  return {
    props: { reviews: reviews ?? [] },
    revalidate: 300,
  };
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR");
}

export default function ReviewsPage({ reviews }: Props) {
  return (
    <>
      <SeoHead
        title="후기"
        description="경희늘품한의원 환자 후기 — 생약·척추관절 치료 경험을 공유합니다."
        path="/reviews"
      />
      <div className="min-h-screen bg-white">
        <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
          <p className="tot-eyebrow">생약·척추관절 치료 경험을 공유합니다.</p>
          <h1 className="tot-title mt-4">Story</h1>
        </header>
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          {reviews.length === 0 ? (
            <p className="py-16 text-center font-serif text-slate-500">작성된 후기가 없습니다.</p>
          ) : (
            <div className="stagger-fade-in divide-y divide-slate-200">
              {reviews.map((review) => (
                <Link
                  key={review._id}
                  href={`/blog/${review.slug.current}`}
                  className="group flex flex-col-reverse gap-6 py-10 first:pt-0 md:flex-row md:items-center md:gap-10"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 text-xs uppercase tracking-[0.15em] text-slate-500">
                      <span>{review.author || "관리자"}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary-700 md:text-3xl">
                      {review.title}
                    </h2>
                    {review.excerpt ? (
                      <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-600">{review.excerpt}</p>
                    ) : null}
                    <span className="tot-link mt-5">더 읽기 →</span>
                  </div>
                  {review.mainImage ? (
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 md:w-64">
                      <img
                        src={urlFor(review.mainImage).width(640).height(480).url()}
                        alt={review.title}
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
