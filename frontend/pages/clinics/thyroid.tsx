import ClinicThyroid from "../../src/pages/ClinicThyroid";
import SeoHead from "../../components/SeoHead";
import {
  breadcrumbJsonLd,
} from "../../src/lib/seo";
import { SITE } from "../../src/lib/site";

export default function ClinicThyroidPage() {
  const clinic = SITE.clinics[0];
  return (
    <>
      <SeoHead
        title={clinic.name}
        description={clinic.description}
        path={clinic.path}
        jsonLd={[
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
      <ClinicThyroid />
    </>
  );
}
