import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
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
      <Head>
        <title>후기 | 경희늘품한의원</title>
      </Head>
      <div className="min-h-screen bg-cream-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="mb-12 text-4xl font-bold text-slate-900">Story</h1>
          {reviews.length === 0 ? (
            <div className="rounded-lg bg-slate-50 p-8 text-slate-600">작성된 후기가 없습니다.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map((review) => (
                <Link
                  key={review._id}
                  href={`/blog/${review.slug.current}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-cream-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    {review.mainImage ? (
                      <img
                        src={urlFor(review.mainImage).width(400).height(300).url()}
                        alt={review.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">이미지 없음</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="mb-2 line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-primary-700">
                      {review.title}
                    </h2>
                    <p className="mb-4 flex-1 line-clamp-3 text-sm text-slate-600">{review.excerpt || ""}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                      <span>{review.author || "관리자"}</span>
                      <span>{formatDate(review.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
