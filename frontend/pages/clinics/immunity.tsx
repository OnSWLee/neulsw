import type { GetStaticProps } from "next";
import ClinicCoreImmunity from "../../src/pages/ClinicCoreImmunity";
import SeoHead from "../../components/SeoHead";
import type { RelatedPost } from "../../components/RelatedPosts";
import { fetchClinicPosts } from "../../src/lib/clinicPosts";
import { breadcrumbJsonLd } from "../../src/lib/seo";
import { SITE } from "../../src/lib/site";

export const getStaticProps: GetStaticProps<{ posts: RelatedPost[] }> = async () => {
  const posts = await fetchClinicPosts("spine");
  return { props: { posts }, revalidate: 60 };
};

export default function ClinicImmunityPage({ posts }: { posts: RelatedPost[] }) {
  const clinic = SITE.clinics[1];
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
      <ClinicCoreImmunity posts={posts} />
    </>
  );
}
