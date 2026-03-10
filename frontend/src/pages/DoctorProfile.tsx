function DoctorProfile() {
  const qualifications = {
    left: [
      "경희대학교 한의과대학 졸업",
      "경희의료원 한방내과전문의 취득",
      "경희대학교 한의과대학 임상한의학 박사",
      "경희의료원 한방비만센터 재직",
      "경희의료원 한방내분비센터 재직",
      "前)이숲한의원 진료원장"
    ],
    right: [
      "대한한의학회 정회원",
      "대한한방내과학회 정회원",
      "북경중의학대학 연수",
      "대만중의학대학 연수",
      "하버드의과대학 연수",
      "(Intensive Review Course)"
    ]
  };

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr] md:items-start">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-slate-900">
                안녕하세요.
              </h1>
              <p className="text-lg text-slate-700">
                경희늘품한의원 대표원장 이승욱입니다.
              </p>
              <p className="leading-relaxed text-slate-700">
                생약으로 면역 체계를 치료합니다. 몸과 생약을 연구하며, 정직한 진료를 하겠습니다.
              </p>
            </div>

            {/* 약력 2컬럼 */}
            <div className="grid gap-8 pt-4 md:grid-cols-2">
              <div className="space-y-3">
                {qualifications.left.map((item, index) => (
                  <div key={index} className="text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {qualifications.right.map((item, index) => (
                  <div key={index} className="text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 사진 */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="w-full overflow-hidden rounded-lg bg-slate-200">
                <img 
                  src="/images/doctor/doctor-photo.png" 
                  alt="이승욱 대표원장" 
                  className="w-full h-auto object-contain"
                      />
              </div>
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-slate-900">
                  이승욱 대표원장
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;





