import Faq from "../src/pages/Faq";
import SeoHead from "../components/SeoHead";
import { ALL_FAQS, breadcrumbJsonLd, faqPageJsonLd } from "../src/lib/seo";
import { SITE } from "../src/lib/site";

export default function FaqPage() {
  return (
    <>
      <SeoHead
        title="FAQ"
        description={`${SITE.name} 자주 묻는 질문 — 진료시간, 위치, 원장 소개, 생약·척추관절 클리닉 안내.`}
        path="/faq"
        jsonLd={[
          faqPageJsonLd(ALL_FAQS),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <Faq />
    </>
  );
}
