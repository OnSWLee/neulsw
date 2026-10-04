import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import SeoHead from "../../components/SeoHead";
import { sanityServerClient, urlFor } from "../../lib/sanityNext";
import { SITE } from "../../src/lib/site";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <img
            src={urlFor(value).width(1000).fit("max").auto("format").url()}
            alt={value.alt || ""}
            className="mx-auto w-full"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center font-serif text-sm italic text-slate-500">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-6 leading-loose">{children}</p>,
    h1: ({ children }) => (
      <h2 className="mb-5 mt-12 font-serif text-3xl font-semibold text-slate-900">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 font-serif text-2xl font-semibold text-slate-900 md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 font-serif text-xl font-semibold text-slate-900 md:text-2xl">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 font-serif text-lg font-semibold text-slate-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-slate-900 pl-6 font-serif text-xl italic leading-relaxed text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 leading-loose">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 leading-loose">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary-700 underline underline-offset-4 hover:text-primary-800"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
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
  const description = post.excerpt || `${post.title} — ${SITE.name} 블로그`;

  return (
    <>
      <SeoHead
        title={post.title}
        description={description}
        path={`/blog/${post.slug.current}`}
        image={imageUrl || SITE.defaultOgImage}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description,
          datePublished: post.publishedAt,
          dateModified: post._updatedAt || post.publishedAt,
          author: {
            "@type": "Person",
            name: post.author || SITE.doctor.name,
          },
          publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
          mainEntityOfPage: `${SITE.url}/blog/${post.slug.current}`,
          image: imageUrl || undefined,
        }}
      />
      <div className="min-h-screen bg-white">
        <article className="stagger-fade-in px-6 py-14 md:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-3 text-xs uppercase tracking-[0.15em] text-slate-500">
              <span>{post.author || "한의사 이승욱"}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>
          </header>

          {imageUrl && (
            <div className="mx-auto mt-12 max-w-4xl overflow-hidden bg-slate-100">
              <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
          )}

          <div className="mx-auto mt-12 max-w-2xl">
            {post.excerpt && (
              <p className="mb-10 border-l-2 border-slate-900 pl-6 font-serif text-lg italic leading-relaxed text-slate-700 md:text-xl">
                {post.excerpt}
              </p>
            )}

            {post.content && post.content.length > 0 && (
              <div className="text-base text-slate-700 md:text-lg">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>
            )}

            <div className="mt-16 border-t border-slate-200 pt-8">
              <Link href="/blog" className="tot-link">
                ← 블로그 목록으로
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
