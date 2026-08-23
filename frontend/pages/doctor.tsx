import DoctorProfile from "../src/pages/DoctorProfile";
import SeoHead from "../components/SeoHead";
import {
  breadcrumbJsonLd,
  physicianJsonLd,
} from "../src/lib/seo";
import { SITE } from "../src/lib/site";

export default function DoctorPage() {
  return (
    <>
      <SeoHead
        title={`이승욱 대표원장 About me`}
        description={`${SITE.doctor.name} ${SITE.doctor.jobTitle} — 경희대 한의과·한방내과 전문의·임상한의학 박사. ${SITE.name}에서 생약·초음파 진료.`}
        path="/doctor"
        jsonLd={[
          physicianJsonLd(),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "이승욱 About me", path: "/doctor" },
          ]),
        ]}
      />
      <DoctorProfile />
    </>
  );
}
