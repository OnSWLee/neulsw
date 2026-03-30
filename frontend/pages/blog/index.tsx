import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { sanityClient, urlFor } from "../../lib/sanityNext";

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

  const posts = await sanityClient.fetch<BlogPost[]>(query);

  return {
    props: { posts: posts ?? [] },
    revalidate: 300,
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
      <Head>
        <title>블로그 | 경희늘품한의원</title>
        <meta name="description" content="경희늘품한의원 블로그 글 목록" />
      </Head>
      <div className="min-h-screen bg-cream-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="mb-10 text-4xl font-bold text-slate-900">Blog</h1>

          {posts.length === 0 ? (
            <div className="rounded-lg bg-slate-50 p-8 text-slate-600">
              작성된 블로그 글이 없습니다.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-cream-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(400).height(300).url()}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="mb-2 line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-primary-700">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 line-clamp-3 text-sm text-slate-600">
                      {post.excerpt || ""}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                      <span>{post.author || "관리자"}</span>
                      <span>{formatDate(post.publishedAt)}</span>
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
