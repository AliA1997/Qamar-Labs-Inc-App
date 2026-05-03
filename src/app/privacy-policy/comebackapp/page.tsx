import ScrollUp from "@/components/Common/ScrollUp";
import TheComebackAppPrivacyPolicy from "@/components/PrivacyPolicy/TheComebackAppPrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comeback App Privacy Policy",
  description: "Privacy Policy for the Comeback App",
  // other metadata
};

export default function TheComebackAppPrivacyPolicyPage() {
    return (
        <div>
            <ScrollUp />
            <TheComebackAppPrivacyPolicy />
        </div>
    );
}