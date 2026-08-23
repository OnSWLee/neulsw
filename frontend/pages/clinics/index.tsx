import Clinics from "../../src/pages/Clinics";
import SeoHead from "../../components/SeoHead";
import { breadcrumbJsonLd, medicalClinicJsonLd } from "../../src/lib/seo";
import { SITE } from "../../src/lib/site";

export default function ClinicsPage() {
  return (
    <>
      <SeoHead
        title="치유 Clinics"
        description={`${SITE.name} 전문 클리닉 — 생약 클리닉과 척추관절 클리닉(초음파 유도 약침)을 한눈에 안내합니다.`}
        path="/clinics"
        jsonLd={[
          medicalClinicJsonLd(),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "치유 Clinics", path: "/clinics" },
          ]),
        ]}
      />
      <Clinics />
    </>
  );
}
