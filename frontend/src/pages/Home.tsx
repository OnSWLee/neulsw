import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanityNext";

export type HomeBlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  mainImage?: unknown;
  slug: { current: string };
};

type HomeProps = {
  posts?: HomeBlogPost[];
};

const clinics = [
  { to: "/clinics/thyroid", title: "생약 클리닉" },
  { to: "/clinics/immunity", title: "척추관절 클리닉" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Home({ posts = [] }: HomeProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 인사말 */}
      <header className="animate-fade-in border-b border-slate-200 px-6 py-16 text-center md:py-24">
        <p className="tot-eyebrow">경희늘품한의원 · 이승욱 대표원장</p>
        <h1 className="tot-title mt-4">안녕하세요.</h1>
      </header>

      {/* 의사 소개 */}
      <section id="about-doctor" className="doctor-profile-section mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="animate-fade-in md:sticky md:top-28 md:self-start">
            <div className="mx-auto w-full max-w-sm overflow-hidden bg-slate-100 md:max-w-none">
              <Image
                src="/images/doctor/doctor-photo.png"
                alt="이승욱 대표원장"
                width={752}
                height={1215}
                priority
                sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 384px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="profile-content stagger-fade-in space-y-8">
            <div className="profile-header space-y-3 border-b border-slate-200 pb-8">
              <p className="font-serif text-2xl font-semibold leading-relaxed text-slate-900 md:text-3xl md:leading-relaxed">
                이승욱 대표원장입니다.
              </p>
              <p className="font-serif text-xl leading-relaxed text-slate-700 md:text-2xl md:leading-relaxed">
                저는 체계적으로 진료하고 공부하기를 좋아하는 학자형 한의사입니다.
              </p>
            </div>

            <article className="profile-block">
              <p className="text-base leading-loose text-slate-700 md:text-lg md:leading-loose">
                경희대학교 학부를 졸업하고 경희의료원 한방병원에서 한방 내과 전문의 수련 과정을 거쳐 임상한의학 박사과정까지 수료했습니다. 임상 한의학 박사로서 제 역할은 <strong className="font-semibold text-slate-900">생약 전문가</strong>로서 생약의 특성을 깊이 이해하고, 이를 이용해 환자의 건강을 근본적으로 개선하는 것이라 믿어왔습니다.
              </p>
            </article>

            <article className="profile-block">
              <p className="text-base leading-loose text-slate-700 md:text-lg md:leading-loose">
                쉽게 회복되지 않는 난치성 만성 질환의 이면에는 면역체계의 문제가 있습니다. 그리고 생약을 이용하는 한의학 치료의 장점은 면역체계의 불균형을 안정화하고, 만성 염증을 일으키는 병독을 제거하는 것에 있습니다.
              </p>
            </article>

            <article className="profile-block">
              <p className="text-base leading-loose text-slate-700 md:text-lg md:leading-loose">
                <strong className="font-semibold text-slate-900">경희늘품한의원</strong>을 개원하고 수많은 환자분들을 진료하며, 더 이상 진료실 안에만 머물러서는 안 되겠다는 결론에 도달했습니다. 생약 치료를 병행하면 더 빠르게 회복할 환자분들이, 근본적인 원인은 해결하지 못한 채 증상 억제에만 의존하다 결국 병을 키워 찾아오시는 안타까운 상황을 반복해서 목격했기 때문입니다.
              </p>
            </article>

            <article className="profile-block highlight-action">
              <p className="border-l-2 border-slate-900 pl-6 font-serif text-lg italic leading-loose text-slate-800 md:text-xl md:leading-loose">
                한의학의 생약 치료가 가진 효용을 객관적인 임상 데이터를 바탕으로 공유하고자 합니다. 관심 있으신 분들은 제가 작성한 글들을 천천히 읽어보시길 권합니다. 오랜 고통을 끝낼 근본적인 방법을 찾을 수 있을겁니다.
              </p>
            </article>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-8">
              <p className="tot-eyebrow">더 자세한 이야기가 궁금하다면?</p>
              <Link href="/doctor" className="tot-link text-base">
                About me →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 클리닉 */}
      <section className="border-t border-slate-200 bg-white px-6 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-semibold text-slate-900 md:text-4xl">
            어떻게 치료하나요?
          </h2>
          <div className="stagger-fade-in mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {clinics.map((clinic) => (
              <Link
                key={clinic.to}
                href={clinic.to}
                className="group flex items-center justify-between gap-4 py-7"
              >
                <h3 className="font-serif text-2xl font-semibold text-slate-900 transition-colors group-hover:text-primary-700 md:text-3xl">
                  {clinic.title}
                </h3>
                <span className="tot-link shrink-0">자세히 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최근 글 */}
      {posts.length > 0 ? (
        <section className="border-t border-slate-200 bg-white px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">최근 글</h2>
              <Link href="/blog" className="tot-link">
                블로그 전체 보기 →
              </Link>
            </div>
            <div className="stagger-fade-in mt-8 divide-y divide-slate-200 border-t border-slate-200">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col-reverse gap-5 py-8 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 text-xs uppercase tracking-[0.15em] text-slate-500">
                      <span>{post.author || "관리자"}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary-700 md:text-2xl">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-600">{post.excerpt}</p>
                    ) : null}
                  </div>
                  {post.mainImage ? (
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 sm:w-44">
                      <img
                        src={urlFor(post.mainImage).width(480).height(360).url()}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default Home;
