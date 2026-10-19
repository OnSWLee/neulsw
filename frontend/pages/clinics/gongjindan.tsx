import Gongjindan from "../../src/pages/Gongjindan";
import SeoHead from "../../components/SeoHead";
import { breadcrumbJsonLd } from "../../src/lib/seo";
import { SITE } from "../../src/lib/site";

const path = "/clinics/gongjindan";
const name = "직접만든 수제 공진단";
const description =
  "경희늘품한의원에서 직접 조제하는 수제 공진단. 사향·녹용·침향 공진단과 관련 연구를 소개합니다.";

export default function GongjindanPage() {
  return (
    <>
      <SeoHead
        title={name}
        description={description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "치유 Clinics", path: "/clinics" },
            { name: "생약 클리닉", path: "/clinics/herbs" },
            { name, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name,
            description,
            url: `${SITE.url}${path}`,
            about: {
              "@type": "MedicalTherapy",
              name: "수제 공진단",
            },
            isPartOf: { "@id": `${SITE.url}/#website` },
          },
        ]}
      />
      <Gongjindan />
    </>
  );
}
