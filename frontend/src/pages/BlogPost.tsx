import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../lib/sanity";

interface BlogPostData {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  _updatedAt?: string;
  mainImage?: { asset: { _ref: string; _type: string } };
  slug: { current: string };
  content?: any[];
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        const query = `*[_type == "blogPost" && slug.current == $slug][0] {
          _id,
          title,
          excerpt,
          author,
          publishedAt,
          _updatedAt,
          mainImage,
          slug,
          content
        }`;
        const data = await client.fetch<BlogPostData | null>(query, { slug });
        setPost(data);
        setNotFound(!data);
      } catch (error) {
        console.error("블로그 포스트 가져오기 오류:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        로딩 중...
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-900">
            포스트를 찾을 수 없습니다
          </h1>
          <p className="mb-8 text-slate-600">
            요청하신 블로그 포스트가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link
            to="/blog"
            className="inline-block rounded-lg bg-primary-700 px-6 py-3 text-white transition hover:bg-primary-800"
          >
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).url()
    : null;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-cream-white">
      <article className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-primary-900">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        {imageUrl && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="mb-8 rounded-lg bg-slate-50 p-6">
            <p className="text-lg text-slate-700">{post.excerpt}</p>
          </div>
        )}

        {post.content && post.content.length > 0 && (
          <div className="prose prose-lg max-w-none">
            <div className="text-slate-700">
              <PortableText
                value={post.content}
                components={{
                  block: {
                    h1: ({ children }) => (
                      <h1 className="mb-4 mt-8 text-3xl font-bold text-slate-900">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-3 mt-6 text-2xl font-bold text-slate-900">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
                        {children}
                      </h3>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-4 leading-relaxed">{children}</p>
                    ),
                  },
                  types: {
                    image: ({ value }: { value?: { asset?: unknown; alt?: string } }) => {
                      if (!value?.asset) return null;
                      const imgUrl = urlFor(value).width(800).url();
                      return (
                        <div className="my-8">
                          <img
                            src={imgUrl}
                            alt={value.alt || "블로그 이미지"}
                            className="rounded-lg"
                          />
                          {value.alt && (
                            <p className="mt-2 text-center text-sm text-slate-500">
                              {value.alt}
                            </p>
                          )}
                        </div>
                      );
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            to="/blog"
            className="text-primary-700 hover:text-primary-800 font-medium"
          >
            ← 블로그 목록으로
          </Link>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
