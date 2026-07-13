import Link from "next/link";
import { Bullets, Para, Section } from "./common";

import { SUPPORT_EMAIL } from "@/constants/contact";

const LAST_UPDATED = "May 3, 2026";
const CONTACT_EMAIL = SUPPORT_EMAIL;
const APP_NAME = "AlSaqr - New way to do Social Media";
export default function AlSaqrPrivacyPolicy() {
  return (
    
    <section className="pb-20 pt-35 md:pt-40 xl:pt-46">
      <div className="mx-auto max-w-2xl">   
         {/* Page header */}
        <div className="mb-12">
          <p className="text-body-color dark:text-body-color-dark mb-3 flex items-center gap-3 text-xs font-light tracking-widest uppercase">
            <span className="bg-primary inline-block h-px w-6" />
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="mb-2 text-3xl font-bold text-black sm:text-4xl dark:text-white">
            AlSaqr:
            <br />
            Privacy Policy
          </h1>
          <p className="text-body-color dark:text-body-color-dark text-sm font-light">
            {APP_NAME}
          </p>
        </div>
      </div>
      <div
        id="top"
        className="col-span-7 scroll-smooth px-1 text-left lg:col-span-5 dark:border-gray-800"
      >
        <div className="mx-auto max-w-2xl">
        <Section title="Introduction">
            <Para>
                At <strong>Alsaqr</strong>, your privacy is important to us. This
                Privacy Policy explains how we collect, use, and safeguard your
                information when you use our social networking platform (the
                &quot;Service&quot;). By using Alsaqr, you agree to the practices
                described in this Policy.
            </Para>
        </Section>    
        <Section title="Information We Collect">
            <Para>
                We may collect the following types of information:
            </Para>
            <Bullets
                items={[
                "Account details such as your name, email, username, and password.",
                "Profile information you choose to share (bio, photos, links).",
                "Content you post, including messages, comments, and media.",
                "Technical information such as IP address, browser type, and device identifiers.",
                "Usage data including interactions with posts and other users."
                ]}
            />
        </Section>
        <Section title="How We Use Your Information">
            <Para>
                Your information may be used to:
            </Para>
            <Bullets
                items={[
                "Provide, operate, and improve the Service.",
                "Personalize your user experience.",
                "Communicate with you, including updates and notifications.",
                "Protect against fraud, abuse, or illegal activity.",
                "Comply with legal obligations and enforce our Terms and Conditions."
                ]}
            />
        </Section>
        <Section title="Cookies and Tracking">
            <Para>
                Alsaqr may use cookies, web beacons, and similar technologies to
                improve your experience, analyze usage, and deliver personalized
                content. You can manage cookie preferences in your browser
                settings, but some features of the Service may not function
                properly if cookies are disabled.
            </Para>
        </Section>

        <Section title="Sharing of Information">
            <Para>
              We do not sell your personal information. However, we may share
              information with:
            </Para>

            <Bullets
                items={[
                "Service providers that assist in operating Alsaqr.",
                "Legal authorities when required by law or to protect our rights.",
                "Other users of the Service, in line with your privacy and account settings.",
                ]}
            />
        </Section>


        <Section title="Data Security">
            <Para>
                We use reasonable security measures to protect your information.
              However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </Para>
        </Section>

        <Section title="Your Rights">
            <Para>
              Depending on your location, you may have rights to access, update,
              or delete your personal information. To exercise these rights,
              please contact us at{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT_EMAIL}
              </Link>
              .
            </Para>
        </Section>

        <Section title="Children&apos;s Privacy">
            <Para>
              Alsaqr is not intended for children under 13. We do not knowingly
              collect personal information from children under 13. If we learn
              that such information has been collected, we will take steps to
              delete it.
            </Para>
        </Section>
        
        <Section title="Changes to this Policy">
            <Para>
              We may update this Privacy Policy from time to time. Updates will
              be effective when posted on this page. Continued use of the
              Service after changes indicates acceptance of the revised Policy.
            </Para>
        </Section>

        <Section title="Contact Us">
            <Para>
              If you have questions about this Privacy Policy, please contact us
              at:{" "}
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT_EMAIL}
              </Link>
            </Para>
        </Section>
        </div>
      </div>
    </section>
  );
}
