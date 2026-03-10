import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'

// Sanity 클라이언트 설정
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'hlql019b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

// Sanity 이미지 URL 생성 함수
const urlFor = (source: any) => {
  return builder.image(source)
}

// 블로그 포스트 데이터 타입
interface BlogPost {
  _id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  _updatedAt?: string
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  slug: {
    current: string
  }
  content: any[]
}

// 블로그 포스트 데이터 가져오기
async function getPost(slug: string): Promise<BlogPost | null> {
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
    }`

    const post = await client.fetch<BlogPost>(query, { slug })
    return post
  } catch (error) {
    console.error('블로그 포스트 가져오기 오류:', error)
    return null
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 블로그 포스트를 찾을 수 없습니다.',
    }
  }

  // OG 이미지 URL 생성
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  // 사이트 기본 URL (환경 변수에서 가져오거나 기본값 사용)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/blog/${post.slug.current}`

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: '한의사 이승욱' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: '경희늘품한의원',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      locale: 'ko_KR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

// 블로그 포스트 페이지 컴포넌트
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // 이미지 URL 생성
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).url()
    : null

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 사이트 기본 URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/blog/${post.slug.current}`

  // JSON-LD 구조화된 데이터 생성
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    image: imageUrl ? imageUrl : undefined,
    url: postUrl,
    author: {
      '@type': 'Physician',
      name: '이승욱',
      jobTitle: '한의사',
    },
    audience: {
      '@type': 'Patient',
      audienceType: 'Patients',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: '경희늘품한의원',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  return (
    <div className="min-h-screen bg-cream-white">
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-4xl px-6 py-10">
        {/* 헤더 */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-primary-900">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="font-medium">한의사 이승욱</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        {/* 메인 이미지 */}
        {imageUrl && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* 요약 */}
        {post.excerpt && (
          <div className="mb-8 rounded-lg bg-slate-50 p-6">
            <p className="text-lg text-slate-700">{post.excerpt}</p>
          </div>
        )}

        {/* 본문 내용 */}
        <div className="prose prose-lg max-w-none">
          {post.content && (
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
                    image: ({ value }) => {
                      if (!value?.asset) return null
                      const imageUrl = urlFor(value).width(800).url()
                      return (
                        <div className="my-8">
                          <img
                            src={imageUrl}
                            alt={value.alt || '블로그 이미지'}
                            className="rounded-lg"
                          />
                          {value.alt && (
                            <p className="mt-2 text-center text-sm text-slate-500">
                              {value.alt}
                            </p>
                          )}
                        </div>
                      )
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

