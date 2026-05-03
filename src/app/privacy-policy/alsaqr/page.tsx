import ScrollUp from "@/components/Common/ScrollUp";
import AlSaqrPrivacyPolicy from "@/components/PrivacyPolicy/AlSaqrPrivacyPolicy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlSaqr Privacy Policy",
  description: "Privacy Policy for the AlSaqr App",
  // other metadata
};


export default function() {
    return (
        <div>
            <ScrollUp />
            <AlSaqrPrivacyPolicy />
        </div>
    );
}