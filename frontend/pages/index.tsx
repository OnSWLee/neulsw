import Home from "../src/pages/Home";
import SeoHead from "../components/SeoHead";
import { medicalClinicJsonLd, websiteJsonLd } from "../src/lib/seo";
import { SITE } from "../src/lib/site";

export default function HomePage() {
  return (
    <>
      <SeoHead
        title={`${SITE.name} | 수원 생약·척추관절 한의원`}
        description={SITE.defaultDescription}
        path="/"
        jsonLd={[medicalClinicJsonLd(), websiteJsonLd()]}
      />
      <Home />
    </>
  );
}
