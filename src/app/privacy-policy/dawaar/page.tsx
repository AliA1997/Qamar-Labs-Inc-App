import ScrollUp from "@/components/Common/ScrollUp";
import DawaarPrivacyPolicy from "@/components/PrivacyPolicy/DawaarPrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dawaar Game Privacy Policy",
  description: "Privacy Policy for the Dawaar Game",
  // other metadata
};
export default function() {
    return (
        <div>
            <ScrollUp />
            <DawaarPrivacyPolicy />
        </div>
    );
}