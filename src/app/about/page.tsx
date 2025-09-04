import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Mission",
  description: "About qamar labs",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]" />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
