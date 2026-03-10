import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  mainImage?: any;
  slug: {
    current: string;
  };
}

function BlogSanity() {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 8;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const start = (currentPage - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;

      const query = `*[_type == "blogPost"] | order(publishedAt desc) [${start}...${end}] {
        _id,
        title,
        excerpt,
        author,
        publishedAt,
        mainImage,
        slug
      }`;

      const countQuery = `count(*[_type == "blogPost"])`;

      const [posts, total] = await Promise.all([
        client.fetch<BlogPost[]>(query),
        client.fetch<number>(countQuery),
      ]);

      setAllBlogPosts(posts);
      setTotalPages(Math.ceil(total / POSTS_PER_PAGE));
    } catch (error) {
      console.error("Sanity 데이터 가져오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Blog</h1>
        </div>

        {/* 블로그 포스트 그리드 */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-slate-600">로딩 중...</div>
          </div>
        ) : allBlogPosts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-slate-600">
              <p className="mb-2">아직 작성된 블로그 글이 없습니다.</p>
              <p className="text-sm text-slate-500">
                관리자 페이지에서 글을 작성해주세요.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allBlogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug.current}`}
                  className="group flex flex-col overflow-hidden rounded-lg bg-cream-white shadow-sm transition hover:shadow-md"
                >
                  {/* 이미지 */}
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(400).height(300).url()}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <div className="text-center text-slate-400">
                          <svg
                            className="mx-auto h-16 w-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-xs">이미지</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="mb-2 text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-primary-700">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                      <span>{post.author}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded px-3 py-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-primary-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BlogSanity;


