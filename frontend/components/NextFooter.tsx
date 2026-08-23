export default function NextFooter() {
  return (
    <footer className="mt-16 bg-primary-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-lg font-semibold">경희늘품한의원</div>
          <p className="text-sm text-slate-200">다시 회복, 전문성 있는 치료를 제공합니다.</p>
        </div>
        <div className="text-sm text-slate-300 sm:text-right">
          <div>경기도 수원시 권선구 동수원로 242번길 6</div>
          <div className="mt-1">Tel: 031-224-1191</div>
          <div className="mt-2">평일 09:00–20:00 (점심 13:00–14:00)</div>
          <div>토요일 09:00–14:00</div>
        </div>
      </div>
    </footer>
  );
}
