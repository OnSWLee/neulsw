import { MetadataRoute } from 'next'
import { createClient } from '@sanity/client'

// Sanity 클라이언트 설정
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'hlql019b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// 기본 URL (환경 변수에서 가져오거나 기본값 사용)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// 블로그 포스트 타입
interface BlogPost {
  slug: {
    current: string
  }
  _updatedAt: string
}

// Sitemap 생성 함수
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Sanity에서 모든 블로그 포스트의 slug와 수정 날짜 가져오기
    const query = `*[_type == "blogPost"] {
      slug,
      _updatedAt
    }`

    const posts = await client.fetch<BlogPost[]>(query)

    // 블로그 포스트 URL 생성
    const blogUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // 기본 페이지들
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/doctor`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/clinics`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/clinics/thyroid`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/clinics/immunity`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ]

    // 모든 URL 합치기
    return [...staticUrls, ...blogUrls]
  } catch (error) {
    console.error('Sitemap 생성 오류:', error)
    // 오류 발생 시 기본 페이지만 반환
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
    ]
  }
}

