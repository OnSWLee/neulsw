import Link from 'next/link'

export default function NotFound() {
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
          href="/blog"
          className="inline-block rounded-lg bg-primary-700 px-6 py-3 text-white transition hover:bg-primary-800"
        >
          블로그 목록으로 돌아가기
        </Link>
      </div>
    </div>
  )
}







