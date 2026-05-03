import ScrollUp from "@/components/Common/ScrollUp";
import MusuahPrivacyPolicy from "@/components/PrivacyPolicy/MusuahPrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Musuah App Privacy Policy",
  description: "Privacy Policy for the Musuah App",
  // other metadata
};
export default function MusuahPrivacyPolicyPage() {
    return (
        <div>
            <ScrollUp />
            <MusuahPrivacyPolicy />
        </div>
    );
}