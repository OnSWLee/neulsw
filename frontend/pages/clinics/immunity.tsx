import ClinicCoreImmunity from "../../src/pages/ClinicCoreImmunity";
import SeoHead from "../../components/SeoHead";
import {
  SPINE_FAQS,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "../../src/lib/seo";
import { SITE } from "../../src/lib/site";

export default function ClinicImmunityPage() {
  const clinic = SITE.clinics[1];
  return (
    <>
      <SeoHead
        title={clinic.name}
        description={clinic.description}
        path={clinic.path}
        jsonLd={[
          faqPageJsonLd(SPINE_FAQS),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "치유 Clinics", path: "/clinics" },
            { name: clinic.name, path: clinic.path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: clinic.name,
            description: clinic.description,
            url: `${SITE.url}${clinic.path}`,
            about: {
              "@type": "MedicalTherapy",
              name: clinic.name,
            },
            isPartOf: { "@id": `${SITE.url}/#website` },
          },
        ]}
      />
      <ClinicCoreImmunity />
    </>
  );
}
