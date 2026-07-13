import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { DEV_EMAIL } from "@/constants/contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Qamar Labs",
  description: `Talk to a developer about your project — ${DEV_EMAIL}`,
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]" />
      <Contact />
    </>
  );
};

export default ContactPage;
