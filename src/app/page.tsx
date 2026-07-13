import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
// import Blog from "@/components/Blog";
// import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
// import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import ResponsiveShowcase from "@/components/ResponsiveShowcase";
// import Testimonials from "@/components/Testimonials";
// import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qamar Labs — Spec-Driven Development Consultancy",
  description:
    "A worker-owned consultancy practising Spec-Driven Development. We agree what done means in writing, before a line of code exists.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Process />
      <ResponsiveShowcase />
      {/* <Video /> */}
      {/* <Brands /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
