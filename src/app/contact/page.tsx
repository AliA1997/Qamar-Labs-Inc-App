import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Qamar Labs",
  description: "Contact us to contribute to our mission",
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
