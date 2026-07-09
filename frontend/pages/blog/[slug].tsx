import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityServerClient, urlFor } from "../../lib/sanityNext";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1000).fit("max").auto("format").url()}
            alt={value.alt || ""}
            className="mx-auto w-full rounded-lg"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-slate-500">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type BlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  _updatedAt?: string;
  mainImage?: unknown;
  slug: { current: string };
  content?: any[];
};

type Props = {
  post: BlogPost | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityServerClient.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blogPost" && defined(slug.current)]{ slug }`
  );

  return {
    paths: (slugs || []).map((item) => ({ params: { slug: item.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  if (!slug) return { notFound: true, revalidate: 60 };

  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, excerpt, author, publishedAt, _updatedAt, mainImage, slug, content
  }`;
  const post = await sanityServerClient.fetch<BlogPost | null>(query, { slug });

  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { post },
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

export default function BlogDetailPage({ post }: Props) {
  if (!post) return null;

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : null;

  return (
    <>
      <Head>
        <title>{post.title} | 경희늘품한의원</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>
      <div className="min-h-screen bg-cream-white">
        <article className="mx-auto max-w-4xl px-6 py-10">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-primary-900">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="font-medium">{post.author || "한의사 이승욱"}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </header>

          {imageUrl && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
              <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
          )}

          {post.excerpt && (
            <div className="mb-8 rounded-lg bg-slate-50 p-6">
              <p className="text-lg text-slate-700">{post.excerpt}</p>
            </div>
          )}

          {post.content && post.content.length > 0 && (
            <div className="prose prose-lg max-w-none text-slate-700">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          )}

          <div className="mt-12 border-t border-slate-200 pt-8">
            <Link href="/blog" className="font-medium text-primary-700 hover:text-primary-800">
              ← 블로그 목록으로
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
