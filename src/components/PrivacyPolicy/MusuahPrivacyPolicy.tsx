"use client";

import { useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "support@qamarlabsllc.com";
const CONTACT_WEBSITE = "https://qamarlabs.netlify.app/contact";
const PRIVACY_EMAIL = "privacy@qamarlabs.com";
const EFFECTIVE_DATE = "TBD";

// ─── Primitives ──────────────────────────────────────────────────────────────

function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="mb-4 text-2xl font-bold text-black dark:text-white">
      {children}
    </h2>
  );
}

function SubHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="mb-3 text-lg font-semibold text-black dark:text-white"
    >
      {children}
    </h3>
  );
}

function MinorHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      id={id}
      className="mb-2 text-base font-semibold text-black dark:text-white"
    >
      {children}
    </h4>
  );
}

function Para({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-body-color dark:text-body-color-dark mb-3 text-sm leading-relaxed font-light ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-black dark:text-white">
      {children}
    </strong>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-3 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-body-color dark:text-body-color-dark flex items-start gap-3 text-sm leading-relaxed font-light"
        >
          <span className="bg-primary mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubBullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-1 ml-5 space-y-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-body-color dark:text-body-color-dark flex items-start gap-3 text-sm leading-relaxed font-light"
        >
          <span className="bg-primary mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full opacity-60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CalloutBox({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-stroke dark:border-strokedark dark:bg-meta-4 my-4 rounded-lg border bg-gray-50 p-4">
      {title && (
        <p className="mb-2 text-sm font-semibold text-black dark:text-white">
          {title}
        </p>
      )}
      <div className="text-body-color dark:text-body-color-dark text-sm leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
}

function SummaryBox({
  title,
  items,
  footer,
}: {
  title: string;
  items: React.ReactNode[];
  footer?: string;
}) {
  return (
    <div className="border-primary/20 bg-primary/5 my-6 rounded-lg border p-5">
      <p className="mb-3 text-sm font-semibold text-black dark:text-white">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-body-color dark:text-body-color-dark flex items-start gap-3 text-sm leading-relaxed font-light"
          >
            <span className="bg-primary mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footer && (
        <p className="text-body-color dark:text-body-color-dark mt-4 text-xs font-light italic">
          {footer}
        </p>
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-stroke dark:border-strokedark my-3 rounded-lg border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-black dark:text-white"
      >
        <span>{title}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-stroke dark:border-strokedark border-t px-4 py-3">
          <div className="text-body-color dark:text-body-color-dark text-sm leading-relaxed font-light">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function ExpandableTable({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-stroke dark:border-strokedark my-4 overflow-hidden rounded-lg border">
      <div className="dark:bg-meta-4 flex items-center justify-between bg-gray-50 px-4 py-3">
        <span className="text-sm font-medium text-black dark:text-white">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border-stroke text-body-color hover:border-primary hover:text-primary dark:border-strokedark dark:text-body-color-dark rounded border px-3 py-1 text-xs font-medium transition"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function BackToTop() {
  return (
    <div className="mt-4 text-right">
      <Link
        href="#top"
        className="text-primary text-xs underline-offset-4 hover:underline"
      >
        Back to top ↑
      </Link>
    </div>
  );
}

function Divider() {
  return <hr className="border-stroke dark:border-strokedark my-8" />;
}

// ─── Definitions Table ────────────────────────────────────────────────────────

const definitions = [
  {
    term: `"Qamar Labs" / "we" / "us" / "our"`,
    meaning:
      "Qamar Labs, the developer committed to building honest, quality applications for the Ummah.",
  },
  {
    term: `"[Mobile Encyclopedia Name]" / "our app" / "our services"`,
    meaning:
      "Our mobile encyclopedia application, including all content, features, and services offered through the app (regardless of language). This does not cover third-party websites or services linked within our app.",
  },
  {
    term: `"you" / "your" / "user"`,
    meaning:
      "You, the individual using our mobile encyclopedia application, regardless of whether you are using it on your own behalf or someone else's.",
  },
  {
    term: `"this Policy" / "this Privacy Policy"`,
    meaning:
      "This document, the Qamar Labs Privacy Policy for our mobile encyclopedia app.",
  },
  {
    term: `"Personal information"`,
    meaning: (
      <>
        Information that could be used to personally identify you. We
        intentionally collect very little of this. Examples include:
        <SubBullets
          items={[
            "(a) your real name, email address (if you contact us), phone number, IP address, device information;",
            "(b) any sensitive data such as religious beliefs, political opinions, health information, or biometric data. We do not collect these.",
          ]}
        />
      </>
    ),
  },
  {
    term: `"Usage Data"`,
    meaning:
      "Anonymous information collected automatically about how you interact with our app, such as which articles you read, how long you use the app, crash reports, and device type. This cannot be used to identify you personally.",
  },
  {
    term: `"third party" / "third parties"`,
    meaning:
      "Individuals, entities, websites, services, products, and applications that are not controlled, managed, or operated by Qamar Labs. This includes analytics providers we may use (like Google Analytics or Firebase) and any external websites linked from our encyclopedia content.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const LAST_UPDATED = "December 2, 2025";
const APP_NAME = "Mūsūʿah - Wikipedia Alternative";

export default function MusuahPrivacyPolicy() {
  return (
    <section className="pt-35 pb-20 md:pt-40 xl:pt-46">
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <div className="mb-12">
          <p className="text-body-color dark:text-body-color-dark mb-3 flex items-center gap-3 text-xs font-light tracking-widest uppercase">
            <span className="bg-primary inline-block h-px w-6" />
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="mb-2 text-3xl font-bold text-black sm:text-4xl dark:text-white">
            Mūsūʿah:
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
        className="scrollbar-hide col-span-7 max-h-screen overflow-y-auto scroll-smooth px-1 text-left lg:col-span-5 dark:border-gray-800"
      >
        <div className="mx-auto max-w-2xl px-4 py-8">
          {/* ── Summary ── */}
          <section className="mb-10">
            <Para>
              This is a <Bold>summary</Bold> of the Musuah Privacy Policy.
              To read the full terms, scroll down. We believe in honesty,
              clarity, and serving the Ummah with transparency.
            </Para>
            <CalloutBox>
              <strong>Disclaimer:</strong> This summary is not a legal document.
              It is a simplified explanation meant to help you understand our
              full Privacy Policy. Think of it as the user‑friendly version of
              how Qamar Labs protects your data.
            </CalloutBox>

            <Para>
              <Bold>
                At Qamar Labs, we believe you should be able to benefit from our
                apps without giving up unnecessary personal information. You
                may:
              </Bold>
            </Para>
            <Bullets
              items={[
                <>
                  Use most Qamar Labs apps{" "}
                  <Bold>without creating an account</Bold>.
                </>,
                <>
                  Create an account{" "}
                  <Bold>without providing your real name</Bold> or unnecessary
                  personal details.
                </>,
              ]}
            />

            <Para>
              <Bold>
                To improve our apps and serve the Ummah better, we collect
                limited information when you:
              </Bold>
            </Para>
            <Bullets
              items={[
                "Use features inside our apps.",
                "Create an account or update your profile.",
                "Send us feedback or contact our support team.",
                "Participate in optional surveys, beta programs, or community feedback sessions.",
              ]}
            />

            <Para>
              <Bold>We are committed to:</Bold>
            </Para>
            <Bullets
              items={[
                <>
                  <Bold>Being honest</Bold> and clear about how your information
                  is used or shared.
                </>,
                "Using reasonable security measures to keep your information safe.",
                <>
                  Never <Bold>selling</Bold> your information or sharing it with
                  third parties for marketing.
                </>,
                <>
                  Only sharing your information in limited cases, such as:
                  <SubBullets
                    items={[
                      "Improving Qamar Labs apps and services.",
                      "Complying with legal obligations.",
                      "Protecting our users and systems.",
                    ]}
                  />
                </>,
                "Retaining your data only for as long as needed to operate and improve our services.",
              ]}
            />

            <Para>
              <Bold>Be aware:</Bold>
            </Para>
            <Bullets
              items={[
                "Any content you publicly submit inside a Qamar Labs app may be visible to other users.",
                "If you submit content without logging in, it may be associated with your device or IP address.",
                "Some Qamar Labs apps include community‑moderated spaces where trusted volunteers may have limited access to non‑public information to maintain safety.",
                "This Privacy Policy applies only to Qamar Labs apps and services. Third‑party tools or integrations may have their own privacy policies.",
                "We may release aggregated, non‑personal data for research, transparency, or community benefit.",
                "If you do not agree with this Privacy Policy, you may choose not to use Qamar Labs apps.",
              ]}
            />
          </section>

          <Divider />

          {/* ── 1. Introduction ── */}
          <section className="mb-10">
            <SectionHeading id="Introduction">Introduction</SectionHeading>

            <SubHeading id="Welcome">Welcome!</SubHeading>
            <Para>
              Qamar Labs is built on a simple but powerful belief: technology
              should uplift the Ummah and make life easier for people
              everywhere. To do that, we continuously improve our apps by
              understanding how they are used, identifying what helps our users
              most, and striving to build tools that benefit the community.
            </Para>
            <Para>
              We believe transparency is an essential part of trust. This
              Privacy Policy explains how Qamar Labs collects, uses, and
              protects the information we receive when you use our apps and
              services. By using any Qamar Labs app, you consent to the
              collection and use of your information as described in this
              Policy, so reading it carefully is important.
            </Para>
            <Para>
              We also believe you should not have to provide unnecessary
              personal information to benefit from our apps. You do not need to
              share your real name, address, or other sensitive details to
              create a standard account or use most Qamar Labs features.
            </Para>
            <Para>
              We do not sell or rent your personal information, and we do not
              give it to others for marketing. Instead, we use the information
              you choose to share to improve our apps, understand what features
              are most helpful, and make your experience smoother and more
              enjoyable. In short: we use your data to make Qamar Labs apps
              better for you.
            </Para>
            <Para>
              At the heart of Qamar Labs are people like you — users who inspire
              us to build more, improve constantly, and serve the Ummah with
              honesty and purpose.
            </Para>

            <SubHeading id="Definitions">Definitions</SubHeading>
            <Para>
              At Qamar Labs, we believe in honesty and transparency. Because
              everyone (not just lawyers) should be able to easily understand
              how and why their information is collected and used, we use common
              language instead of more formal terms throughout this Policy. Here
              is a table of translations:
            </Para>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-stroke dark:border-strokedark border-b">
                    <th className="py-2 pr-4 text-left font-semibold text-black dark:text-white">
                      When we say…
                    </th>
                    <th className="py-2 text-left font-semibold text-black dark:text-white">
                      …we mean:
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {definitions.map((row, i) => (
                    <tr
                      key={i}
                      className="border-stroke/50 dark:border-strokedark/50 border-b"
                    >
                      <td className="py-3 pr-4 align-top text-xs font-medium whitespace-nowrap text-black dark:text-white">
                        {row.term}
                      </td>
                      <td className="text-body-color dark:text-body-color-dark py-3 align-top text-xs leading-relaxed font-light">
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <MinorHeading id="coverage">
                What This Privacy Policy Does and Does Not Cover
              </MinorHeading>
              <Para>
                This Privacy Policy applies to our collection and handling of
                information about you that we receive as a result of your use of
                our mobile encyclopedia app. This Policy also applies to
                information that we receive from our partners or other third
                parties.
              </Para>

              <Accordion title="Examples of What This Privacy Policy Covers">
                <Bullets
                  items={[
                    <>
                      <Bold>✓ Your use of the encyclopedia</Bold> — Reading
                      articles, searching for content, and navigating through
                      the app.
                    </>,
                    <>
                      <Bold>✓ Saving favorites</Bold> — When you bookmark
                      articles for offline reading, this data is stored locally
                      on your device.
                    </>,
                    <>
                      <Bold>✓ Anonymous usage statistics</Bold> — If you
                      consent, we may collect anonymized data about which
                      features are most popular to improve the app.
                    </>,
                    <>
                      <Bold>✓ Crash reports</Bold> — Technical data sent when
                      the app unexpectedly closes, helping us fix bugs and
                      improve stability.
                    </>,
                  ]}
                />
              </Accordion>

              <Para>
                This Privacy Policy, however, does not cover some situations
                where we may gather or process information. In keeping with our
                commitment to quality over quantity, we intentionally limit data
                collection to only what is necessary.
              </Para>

              <Accordion title="What This Privacy Policy Does NOT Cover">
                <Para>
                  This section is part of the Privacy Policy and is meant to
                  explain in detail which situations are not covered.
                </Para>
                <MinorHeading>External Links</MinorHeading>
                <Para>
                  Our encyclopedia may contain links to external websites,
                  references, or third-party content. Once you leave our app,
                  this Privacy Policy no longer applies. We encourage you to
                  review the privacy policies of any external sites you visit.
                </Para>
                <MinorHeading>
                  Third-Party Services Integrated into Our App
                </MinorHeading>
                <Para>
                  We may use third-party services (such as analytics providers
                  or video hosting platforms) to enhance your experience. These
                  services have their own privacy policies and data handling
                  practices. We select partners who align with our values of
                  honesty and respect for user privacy.
                </Para>
                <MinorHeading>Device Permissions</MinorHeading>
                <Para>
                  Our app may request access to certain device features (like
                  storage for saving favorites). How your device handles these
                  permissions and any data stored locally on your device is
                  governed by your device&apos;s operating system and settings,
                  not this Policy.
                </Para>
                <MinorHeading>Children Under 13</MinorHeading>
                <Para>
                  While our app is suitable for all ages, we do not knowingly
                  collect personal information from children under 13. If you
                  believe a child has provided us with personal information,
                  please contact us so we can delete it.
                </Para>
                <MinorHeading>Communications with Us</MinorHeading>
                <Para>
                  If you contact us directly via email or support channels,
                  those communications are covered by this Policy while in our
                  systems. However, any information you choose to share in those
                  communications is voluntary.
                </Para>
              </Accordion>

              <Para>
                We are committed to being the best we can be by building apps
                that respect your privacy while serving the Ummah with valuable
                knowledge. If you have any questions about what is or isn&apos;t
                covered, please contact us.
              </Para>
              <BackToTop />
            </div>
          </section>

          <Divider />

          {/* ── 2. Information We Collect & How We Use It ── */}
          <section className="mb-10">
            <SectionHeading id="Collection_Use_of_Info">
              Information We Collect &amp; How We Use It
            </SectionHeading>

            <SubHeading id="Types_of_Information">
              Types of Information We Receive From You
            </SubHeading>
            <Para>
              At Qamar Labs, we believe in honesty and minimal data collection.
              Our mobile encyclopedia is designed to respect your privacy while
              providing quality knowledge to the Ummah. Here&apos;s what you
              should know about the information we collect:
            </Para>

            <MinorHeading id="Information_You_Provide_Directly">
              Information You Provide Directly
            </MinorHeading>
            <Para>
              Unlike many online services, we intentionally limit the
              information we ask from you. You can use our encyclopedia to read
              articles, search for topics, and access knowledge without
              providing any personal information.
            </Para>
            <Para>
              <Bold>No Account Required:</Bold> You are{" "}
              <Bold>not required</Bold> to create an account or log in to use
              our mobile encyclopedia. We believe access to knowledge should be
              free and private.
            </Para>

            <ExpandableTable title="Information That May Be Visible">
              <Para>
                Since we do not require accounts or contributions, very little
                information about you is visible to us or others. However,
                please be aware:
              </Para>
              <Bullets
                items={[
                  <>
                    <Bold>Anonymous Usage Data:</Bold> If you consent,
                    anonymized data about how you use the app (which articles
                    you read, how long you spend) may be collected to help us
                    improve the app.
                  </>,
                  <>
                    <Bold>Device Information:</Bold> Basic device information
                    (device type, OS version) may be collected automatically for
                    analytics and crash reporting.
                  </>,
                  <>
                    <Bold>Saved Favorites:</Bold> Any articles you bookmark or
                    save for offline reading are stored locally on your device
                    and are not accessible to us.
                  </>,
                ]}
              />
              <Para>
                We do <Bold>not</Bold> collect your name, email address, phone
                number, or precise location. We believe in quality over
                quantity—including when it comes to data collection.
              </Para>
            </ExpandableTable>

            <BackToTop />

            <MinorHeading id="Account_Information">
              Account Information
            </MinorHeading>
            <Para>
              <Bold>✨ No Account? No Problem!</Bold>
            </Para>
            <Para>
              Our mobile encyclopedia is designed to be used without an account.
              You can:
            </Para>
            <Bullets
              items={[
                "Read thousands of articles instantly",
                "Search for any topic",
                "Bookmark your favorite articles (saved locally)",
                "Access content offline",
              ]}
            />
            <Para>
              All of this without ever creating an account or sharing your
              personal information.
            </Para>

            <ExpandableTable title="What If I Contact Support?">
              <Para>
                If you choose to contact us for support or with questions:
              </Para>
              <Bullets
                items={[
                  "We will receive your email address and the content of your message",
                  "This information is used only to respond to your inquiry",
                  "We will not add you to marketing lists or share your email with third parties",
                  "Your support correspondence is kept confidential",
                ]}
              />
              <Para>
                We value your trust and handle any information you share with us
                honestly and responsibly, in line with our mission to serve the
                Ummah.
              </Para>
            </ExpandableTable>

            <BackToTop />

            <MinorHeading id="Location_Information">
              Location Information
            </MinorHeading>
            <Para>
              <Bold>We do not collect your precise location.</Bold>
            </Para>
            <Para>
              Unlike many apps, we do not use GPS, cell tower triangulation, or
              WiFi positioning to track where you are. Your physical location
              remains private when using our encyclopedia.
            </Para>

            <MinorHeading id="IP_Addresses">IP Addresses</MinorHeading>
            <Para>
              When you use our app, we may automatically receive the IP address
              of your device. This is standard for internet communications. IP
              addresses may be used:
            </Para>
            <Bullets
              items={[
                "To provide the service (delivering content to your device)",
                "For anonymous geographic region analysis (country-level only)",
                "To diagnose problems and improve app performance",
              ]}
            />
            <Para>
              IP addresses are not used to identify you personally and are
              handled in accordance with our commitment to privacy.
            </Para>
            <BackToTop />

            <MinorHeading id="Analytics_Usage_Data">
              Analytics &amp; Usage Data
            </MinorHeading>
            <Para>
              To help us improve the app and deliver on our promise of quality
              over quantity, we may use third-party analytics services that
              collect anonymous usage data.
            </Para>
            <Para>
              <Bold>This may include:</Bold> Which articles are most popular,
              how long users spend in the app, which features are used most,
              crash reports, and device types.
            </Para>
            <Para>
              <Bold>This does NOT include:</Bold> Your name, email, precise
              location, or any information that could identify you personally.
            </Para>
            <Para>
              You can learn more about our analytics partners in the
              &quot;Information We Share&quot; section of this Privacy Policy.
            </Para>

            <SummaryBox
              title="📋 Summary: What We Collect"
              items={[
                "✓ Basic device information for app functionality",
                "✓ IP address (temporary, for service delivery)",
                "✗ No name, email, or account information",
                "✗ No precise location",
                "✗ No sensitive personal data",
              ]}
              footer="At Qamar Labs, we're committed to being honest, serving the Ummah, and delivering quality over quantity—including how we handle your data."
            />
            <BackToTop />

            {/* Information We Receive Automatically */}
            <SubHeading id="Information_We_Receive_Automatically">
              Information We Receive Automatically
            </SubHeading>
            <Para>
              At Qamar Labs, our mission is to be honest, serve the Ummah, and
              deliver quality over quantity. This extends to how we handle
              information about your use of our mobile encyclopedia. We want to
              make our app better for you by learning more about how you use
              it—while respecting your privacy every step of the way.
            </Para>
            <Para>
              Examples of what we learn include: which articles are most
              popular, what features you find helpful, how you navigate through
              the app, and whether certain improvements make your experience
              better. We keep all information related to your use of our app
              confidential, except as provided in this Policy.
            </Para>
            <Para>
              Like most mobile applications, we receive some information
              automatically when you use our encyclopedia. This information may
              include:
            </Para>
            <Bullets
              items={[
                "The type of device you are using (manufacturer and model)",
                "Your device's operating system and version",
                "App version and settings",
                "Crash logs and performance data",
                "Which pages you view and for how long",
                "The date and time of your interactions with the app",
                "Your general region (country-level, not precise location)",
              ]}
            />
            <Para>
              <Bold>
                Put simply, we use this information to enhance your experience.
              </Bold>{" "}
              For example, we use it to:
            </Para>
            <Bullets
              items={[
                "Optimize the app for your specific device",
                "Fix bugs and improve performance",
                "Understand which articles are most valuable to our users",
                "Test new features to see what works best",
                "Analyze trends to make content more accessible",
              ]}
            />
            <Para>
              All of this is done with anonymized, aggregated data that cannot
              be used to identify you personally.
            </Para>
            <BackToTop />

            {/* Local Storage */}
            <MinorHeading id="Local_Storage">
              Local Storage &amp; Data Collection Technologies
            </MinorHeading>
            <Para>
              To make your experience smoother and enable features like offline
              reading, we use standard technologies that store data locally on
              your device. These include:
            </Para>
            <Bullets
              items={[
                <>
                  <Bold>Local Storage:</Bold> Saves your preferences and
                  recently read articles on your device
                </>,
                <>
                  <Bold>Cookies:</Bold> Small text files that remember your
                  settings (used primarily if you access our web version)
                </>,
                <>
                  <Bold>App Cache:</Bold> Stores content so you can access
                  articles offline
                </>,
              ]}
            />
            <Para>
              We recognize that some of these technologies can be misused by
              others, which is why we want to be completely transparent about
              how and why we use them. We will <Bold>never</Bold> use
              third-party tracking cookies or data collection tools without your
              explicit permission.
            </Para>

            <Accordion title="📱 How We Use Locally Stored Data">
              <Para>
                Local storage helps us provide you with a better, more
                personalized experience while keeping your data on your device.
                Here&apos;s how:
              </Para>
              <Bullets
                items={[
                  <>
                    <Bold>Offline Reading:</Bold> When you save articles to read
                    later, they are stored locally on your device. This means
                    you can access them without an internet connection, and we
                    never see which articles you&apos;ve saved.
                  </>,
                  <>
                    <Bold>Your Preferences:</Bold> If you adjust settings like
                    text size or theme (light/dark mode), these preferences are
                    saved locally so you don&apos;t have to set them each time
                    you open the app.
                  </>,
                  <>
                    <Bold>Recently Read:</Bold> We may store a list of your
                    recently viewed articles locally to make it easy for you to
                    pick up where you left off. This information never leaves
                    your device.
                  </>,
                  <>
                    <Bold>Performance Optimization:</Bold> We cache certain
                    content to make the app load faster and reduce data usage.
                    This is standard practice and improves your experience.
                  </>,
                  <>
                    <Bold>Bookmarks/Favorites:</Bold> Your saved articles are
                    stored only on your device unless you explicitly choose to
                    sync them.
                  </>,
                ]}
              />
              <Para>
                The key principle is this: information that is personal to
                you—like what you read, save, or bookmark—stays on your device
                unless you explicitly choose to share it.
              </Para>
            </Accordion>

            <Para>
              <Bold>Want to know more?</Bold> We use only essential local
              storage that is necessary for the app to function properly. We do
              not use any third-party cookies for advertising or tracking
              purposes.
            </Para>
            <Para>
              <Bold>You&apos;re in control.</Bold> You can clear locally stored
              data at any time through your device settings:
            </Para>
            <Bullets
              items={[
                "On iOS: Settings → General → iPhone Storage → [App Name]",
                "On Android: Settings → Apps → [App Name] → Storage → Clear Data",
              ]}
            />
            <Para>
              Please note that if you clear locally stored data, you may lose
              your saved articles, preferences, and reading history. Some
              features may need to be reconfigured.
            </Para>
            <Para>
              <Bold>Important Note:</Bold> Unlike many online platforms, we do
              not maintain public logs of user activity. Since we don&apos;t
              require accounts, there are no usernames or public profiles
              associated with your reading activity. Your use of our
              encyclopedia is private.
            </Para>

            <CalloutBox title="✅ Qamar Labs Commitment:">
              <Bullets
                items={[
                  "No third-party tracking cookies",
                  "No advertising trackers",
                  "No selling of your data (we don't have any to sell)",
                  "Local storage only for app functionality",
                  "Your reading habits remain private to you",
                ]}
              />
            </CalloutBox>

            <Para>
              If you ever come across any data collection tool in our app that
              concerns you, or if you have questions about how we handle
              information, please contact us immediately. We take our commitment
              to honesty and the Ummah seriously.
            </Para>

            <SummaryBox
              title="📋 Part 2 Summary: What You Should Know"
              items={[
                <>
                  <Bold>✓ Automatic information:</Bold> Basic device and usage
                  data (anonymized) to improve the app
                </>,
                <>
                  <Bold>✓ Local storage:</Bold> Saves your preferences and
                  articles on YOUR device, not ours
                </>,
                <>
                  <Bold>✓ Offline reading:</Bold> Your saved articles stay
                  private on your device
                </>,
                <>
                  <Bold>✓ No tracking:</Bold> We don&apos;t use third-party
                  cookies or follow you across the internet
                </>,
                <>
                  <Bold>✓ You&apos;re in control:</Bold> You can clear all
                  locally stored data anytime
                </>,
              ]}
              footer="At Qamar Labs, we're building apps for the Ummah with honesty and quality over quantity. Your privacy is not an afterthought—it's built into how we design our applications."
            />
            <BackToTop />
          </section>

          <Divider />

          {/* ── 3. Information Sharing ── */}
          <section className="mb-10">
            <SectionHeading id="Sharing">Information Sharing</SectionHeading>

            <SubHeading id="When_May_We_Share">
              When May We Share Your Information?
            </SubHeading>
            <Para>
              At Qamar Labs, our commitment to honesty means we are transparent
              about the limited circumstances where we might share information.
              The good news is that since we collect very little personal
              information, there is very little to share. Here are the rare
              situations where sharing could occur:
            </Para>

            <MinorHeading id="share-with-permission">
              With Your Explicit Permission
            </MinorHeading>
            <Para>
              We will only share your personal information for a specific
              purpose if you explicitly agree to it. For example, if you contact
              us for support and we need to involve a third-party service to
              help resolve your issue, we would ask for your permission first.
              We believe in quality over quantity—including when it comes to
              permissions. You&apos;ll always know what you&apos;re agreeing to.
            </Para>

            <MinorHeading id="share-legal-reasons">
              For Legal Reasons
            </MinorHeading>
            <Para>
              We will access, use, or disclose your Personal Information only if
              we reasonably believe it is necessary to satisfy a valid and
              legally enforceable warrant, subpoena, court order, law, or
              regulation. However, if we believe a request for disclosure is
              legally invalid or an abuse of the legal system, we will try our
              best to fight it.
            </Para>
            <Para>
              <Bold>Our commitment to you:</Bold> If we receive a legal demand
              for your information, we will notify you via email (if you have
              provided one) at least 7 days before disclosure, when legally
              permitted to do so. This gives you an opportunity to challenge the
              request if you wish.
            </Para>
            <Para>
              Nothing in this Privacy Policy limits any legal objections or
              defenses you may have to a third party&apos;s request to disclose
              your information. We recommend seeking legal counsel if such a
              situation arises.
            </Para>

            <MinorHeading id="share-org-transfer">
              If Qamar Labs Is Transferred (Extremely Unlikely!)
            </MinorHeading>
            <Para>
              In the highly unlikely event that ownership of Qamar Labs changes,
              or we go through a reorganization (such as a merger or
              acquisition), we will continue to keep your Personal Information
              confidential, except as provided in this Policy. We will provide
              notice to you through our app and website at least 30 days before
              any Personal Information is transferred or becomes subject to a
              different privacy policy. We will ensure that the new entity
              honors this Privacy Policy or give you the option to delete your
              information.
            </Para>

            <MinorHeading id="share-to-protect-people">
              To Protect You, Ourselves &amp; Others
            </MinorHeading>
            <Para>
              We may access and share Personal Information if we reasonably
              believe it is necessary to:
            </Para>
            <Bullets
              items={[
                "Enforce or investigate potential violations of our Terms of Use",
                "Detect, prevent, or address fraud, security, or technical issues",
                "Protect against harm to the rights, property, or safety of Qamar Labs, our users, or the public",
                "Respond to reports of abuse or harassment",
              ]}
            />
            <Para>
              We hope this never comes up, but we may disclose your Personal
              Information if we believe it is reasonably necessary to prevent
              imminent and serious bodily harm or death to a person.
            </Para>
            <Para>
              <Bold>Note:</Bold> Since our mobile encyclopedia does not require
              accounts or user contributions, these situations are extremely
              rare.
            </Para>

            <MinorHeading id="share-to-our-sp">
              To Our Service Providers
            </MinorHeading>
            <Para>
              We use third-party service providers to help run and improve our
              mobile encyclopedia. These may include:
            </Para>
            <Bullets
              items={[
                "Cloud hosting providers (to serve app content)",
                "Analytics services (to understand usage patterns anonymously)",
                "Crash reporting tools (to fix bugs and improve stability)",
                "Customer support tools (if you contact us for help)",
              ]}
            />
            <Para>
              We only give these providers access to the information necessary
              to perform their services. We put confidentiality agreements in
              place to ensure they treat your information consistently with this
              Policy and no less protectively than we do.
            </Para>
            <Para>
              <Bold>Importantly:</Bold> Our service providers receive only
              anonymized or aggregated data whenever possible. For example,
              analytics providers see that &quot;1000 users read article X&quot;
              but not &quot;User 123 read article X.&quot;
            </Para>
            <Para>
              If you are using our mobile app, your IP address may be shared
              with our hosting provider to deliver content to your device. This
              is standard for any internet service.
            </Para>
            <CalloutBox title="📋 Current Service Providers:">
              <Para>
                We will maintain a list of our current service providers and
                links to their privacy policies on our website. Please check
                there for the most up-to-date information.
              </Para>
            </CalloutBox>

            <MinorHeading id="share-to-experiment">
              For Research &amp; Improvement
            </MinorHeading>
            <Para>
              As part of our mission to serve the Ummah with quality knowledge,
              we occasionally collaborate with researchers to understand how our
              app is used and how we can improve it.
            </Para>
            <Para>
              <Bold>What we share:</Bold> We share only non-personal, aggregated
              information with researchers—for example, &quot;articles about
              Islamic history are read 50% more on weekends&quot; or &quot;users
              in certain regions prefer longer articles.&quot;
            </Para>
            <Para>
              <Bold>Our safeguards:</Bold> When we give researchers access to
              any data, we:
            </Para>
            <Bullets
              items={[
                "Require them to sign confidentiality agreements",
                "Ensure data is anonymized and cannot be traced to individuals",
                "Prohibit them from attempting to re-identify users",
                "Review their research methodology and intended use",
              ]}
            />
            <Para>
              These collaborations help us make data-driven decisions about how
              to better serve you, always respecting your privacy.
            </Para>

            <MinorHeading id="share-because-public">
              Information You Make Public
            </MinorHeading>
            <Para>
              <Bold>Important:</Bold> Our mobile encyclopedia is designed for
              reading, not for posting content. You cannot make public posts,
              comments, or contributions within the app itself. Therefore, there
              is no scenario where you would accidentally make your personal
              information public through our app.
            </Para>

            <SummaryBox
              title="📋 Summary: How We Share Information"
              items={[
                <>
                  <Bold>✓ We collect very little, so we share very little</Bold>
                </>,
                <>
                  <Bold>✓ We never sell your information</Bold> — period
                </>,
                <>
                  <Bold>✓ We share only with your permission</Bold> or for legal
                  reasons
                </>,
                <>
                  <Bold>
                    ✓ Service providers get only what&apos;s necessary
                  </Bold>{" "}
                  and are bound by confidentiality
                </>,
                <>
                  <Bold>
                    ✓ Research partners receive only anonymized, aggregated data
                  </Bold>
                </>,
                <>
                  <Bold>✓ No public posting means no accidental sharing</Bold>
                </>,
              ]}
              footer="At Qamar Labs, we're building honest apps for the Ummah. Our sharing practices reflect our commitment to quality over quantity—and privacy first."
            />
          </section>

          <Divider />

          {/* ── 4. Data Protection & Your Rights ── */}
          <section className="mb-10">
            <SectionHeading id="Protection">
              Data Protection &amp; Your Rights
            </SectionHeading>

            <SubHeading id="How_Do_We_Protect">
              How Do We Protect Your Information?
            </SubHeading>
            <Para>
              At Qamar Labs, we take the protection of your information
              seriously. Our commitment to honesty means being transparent about
              both our protections and their limitations.
            </Para>
            <Para>What we do to protect you:</Para>
            <Bullets
              items={[
                "We use industry-standard encryption to protect data transmitted between our app and our servers",
                "We implement access controls and security procedures for our systems",
                "We regularly review our security practices",
                "We minimize data collection, which inherently minimizes risk",
                "We keep sensitive information (like support emails) in secured, access-restricted systems",
              ]}
            />
            <Para>
              <Bold>Important to know:</Bold> No method of electronic
              transmission or storage is 100% secure. While we strive to protect
              your information, we cannot guarantee absolute security. What we
              can guarantee is our commitment to transparency if any security
              issue arises.
            </Para>
            <CalloutBox title="🔒 Security Best Practices for You:">
              <Bullets
                items={[
                  "Keep your device's operating system and apps updated",
                  "Use a secure lock screen on your device",
                  "Be cautious when using public Wi-Fi networks",
                  "Download apps only from official app stores (Google Play, Apple App Store)",
                ]}
              />
            </CalloutBox>
            <Para>
              <Bold>Never share sensitive information via email.</Bold> We will
              never ask for your passwords or personal information through
              email. If you receive any suspicious communication claiming to be
              from Qamar Labs, please contact us immediately.
            </Para>

            <SubHeading id="How_Long_Do_We_Keep">
              How Long Do We Keep Your Data?
            </SubHeading>
            <Para>
              We follow the principle of data minimization: we keep information
              only for as long as necessary to fulfill the purposes described in
              this Policy, unless a longer retention period is required by law.
            </Para>
            <Para>Our retention practices:</Para>
            <Bullets
              items={[
                <>
                  <Bold>Anonymous usage data:</Bold> Aggregated and retained for
                  up to 90 days for analysis purposes
                </>,
                <>
                  <Bold>Crash logs:</Bold> Retained for up to 30 days to
                  diagnose and fix issues
                </>,
                <>
                  <Bold>IP addresses:</Bold> Temporarily stored in server logs,
                  typically deleted within 90 days
                </>,
                <>
                  <Bold>Support correspondence:</Bold> Retained as long as
                  needed to address your inquiry and for legitimate business
                  purposes (usually up to 2 years)
                </>,
                <>
                  <Bold>Local device data:</Bold> Stored on your device until
                  you choose to clear it—we don&apos;t have access to it
                </>,
              ]}
            />
            <Para>
              <Bold>Note:</Bold> Since our mobile encyclopedia is read-only and
              does not require accounts or user contributions, there is no
              permanent public record of your activity. Your reading history
              stays on your device and is not stored on our servers.
            </Para>
            <Para>
              For more details about our data retention practices, please{" "}
              <Link
                href="#contact-us"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact us
              </Link>
              .
            </Para>

            <SubHeading id="Your_Rights">
              Your Rights &amp; Control Over Your Information
            </SubHeading>
            <Para>
              We believe you should have control over your information.
              Depending on your location, you may have certain rights regarding
              your personal data.
            </Para>
            <Para>Your rights may include:</Para>
            <Bullets
              items={[
                <>
                  <Bold>Right to know:</Bold> What information we collect and
                  how we use it (explained in this Policy)
                </>,
                <>
                  <Bold>Right to access:</Bold> Request a copy of the personal
                  information we hold about you
                </>,
                <>
                  <Bold>Right to deletion:</Bold> Request that we delete your
                  personal information
                </>,
                <>
                  <Bold>Right to correction:</Bold> Request that we correct
                  inaccurate information
                </>,
                <>
                  <Bold>Right to restriction:</Bold> Object to or restrict our
                  processing of your data
                </>,
                <>
                  <Bold>Right to data portability:</Bold> Receive your data in a
                  structured, commonly used format
                </>,
              ]}
            />
            <Para>
              <Bold>How to exercise your rights:</Bold> To make a request
              regarding your personal information, please contact us at{" "}
              <Link
                href={`mailto:${PRIVACY_EMAIL}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {PRIVACY_EMAIL}
              </Link>
              . We will respond to your request consistent with applicable law
              and typically within 30 days.
            </Para>
            <CalloutBox title="✅ Rights You Can Exercise Directly:">
              <Bullets
                items={[
                  <>
                    <Bold>Clear local data:</Bold> You can clear all locally
                    stored data (bookmarks, preferences, history) through your
                    device settings at any time
                  </>,
                  <>
                    <Bold>Opt out of analytics:</Bold> If our app includes
                    analytics, you can opt out through your device settings
                  </>,
                  <>
                    <Bold>Uninstall:</Bold> You can simply uninstall the app at
                    any time, which removes all app data from your device
                  </>,
                ]}
              />
            </CalloutBox>
            <Para>
              <Bold>Important note:</Bold> Because our app does not require
              accounts and collects minimal personal information, many of these
              rights may not apply simply because we don&apos;t have the data to
              act upon.
            </Para>
            <Para>
              We will not discriminate against you for exercising any of your
              privacy rights. Our service will remain fully functional
              regardless of your choices.
            </Para>

            <SummaryBox
              title="📋 Summary: Protection & Your Rights"
              items={[
                <>
                  <Bold>✓ Industry-standard security measures</Bold> —
                  encryption, access controls, regular reviews
                </>,
                <>
                  <Bold>✓ Minimal data means minimal risk</Bold> — we collect
                  only what&apos;s necessary
                </>,
                <>
                  <Bold>✓ Data retained only as long as needed</Bold> —
                  typically 30-90 days
                </>,
                <>
                  <Bold>✓ You have rights</Bold> — access, deletion, correction,
                  and more
                </>,
                <>
                  <Bold>✓ Direct control</Bold> — clear local data anytime, opt
                  out of analytics, uninstall
                </>,
                <>
                  <Bold>✓ No permanent public record</Bold> — your reading
                  activity stays on your device
                </>,
              ]}
              footer="At Qamar Labs, protecting your privacy isn't just about compliance—it's about honoring our commitment to honesty and serving the Ummah with quality applications you can trust."
            />
          </section>

          <Divider />

          {/* ── 5. Important Information ── */}
          <section className="mb-10">
            <SectionHeading id="Important_info">
              Important Information
            </SectionHeading>
            <Para>
              At Qamar Labs, we believe in honesty and transparency. By using
              our mobile encyclopedia, you trust us with your information. This
              Privacy Policy is designed to help you understand what we collect,
              why we collect it, and what you can do to protect your privacy.
            </Para>

            <SubHeading id="where-is-qamarlabs">
              Where Is Qamar Labs Located?
            </SubHeading>
            <Para>
              Qamar Labs is a developer committed to building quality
              applications for the Ummah. We are headquartered in [Insert
              Country/City]. Our servers and infrastructure may be located in
              various countries, including the United States and other regions.
            </Para>
            <Para>
              By using our mobile encyclopedia, you understand that your
              information may be collected, transferred, stored, and processed
              in countries where our servers and service providers are located.
              These countries may have data protection laws that differ from
              those in your country of residence. We take steps to ensure that
              your information receives an adequate level of protection
              regardless of where it is processed.
            </Para>
            <CalloutBox title="🌍 International Users:">
              <Para>
                If you are accessing our app from outside the US, please be
                aware that your information may be transferred to and maintained
                on servers located outside of your country. By using our app,
                you consent to this transfer and processing of your information.
              </Para>
            </CalloutBox>

            <SubHeading id="DNT">Do Not Track (DNT) Signals</SubHeading>
            <Para>
              We respect your privacy choices. Currently, our app does not
              respond to &quot;Do Not Track&quot; signals from web browsers
              because:
            </Para>
            <Bullets
              items={[
                "We do not track you across third-party websites",
                "We do not use your information for marketing or advertising purposes",
                "We already protect all users in accordance with this Privacy Policy regardless of DNT signals",
              ]}
            />
            <Para>
              In short, because we don&apos;t engage in the types of tracking
              that DNT is designed to prevent, there&apos;s no behavior to
              change. We treat all users with the same high standard of privacy
              protection.
            </Para>

            <SubHeading id="changes">Changes to This Privacy Policy</SubHeading>
            <Para>
              As we grow and improve our app, and as laws and technologies
              evolve, we may need to update this Privacy Policy. Our commitment
              to honesty means we will always notify you of significant changes.
            </Para>
            <Para>How we handle changes:</Para>
            <Bullets
              items={[
                <>
                  <Bold>Major changes:</Bold> For significant updates that
                  affect your rights or how we handle your information, we will:
                  <SubBullets
                    items={[
                      `Update the "Effective Date" at the top of this policy`,
                      "Provide notice within the app (such as a pop-up or notification)",
                      "Give you an opportunity to review the changes before they take effect",
                      "Offer a 30-day period for you to ask questions or provide feedback",
                    ]}
                  />
                </>,
                <>
                  <Bold>Minor changes:</Bold> For clarifications, grammatical
                  fixes, or administrative updates, we will post the updated
                  policy with a revised effective date. We may provide notice
                  through the app when appropriate.
                </>,
              ]}
            />
            <Para>
              We encourage you to review this Privacy Policy periodically. Your
              continued use of our mobile encyclopedia after any updates
              constitutes your acceptance of the revised policy. If you do not
              agree with the changes, you should stop using the app and
              uninstall it.
            </Para>
            <CalloutBox>
              <Para>
                <Bold>📅 Current version effective:</Bold> {EFFECTIVE_DATE}
              </Para>
            </CalloutBox>

            <SubHeading id="contact-us">Contact Us</SubHeading>
            <Para>
              We&apos;re here to help! If you have questions, concerns, or
              suggestions about this Privacy Policy or how we handle your
              information, please reach out to us. We aim to respond to all
              inquiries within 30 days.
            </Para>
            <CalloutBox title="📧 How to Reach Us">
              <p className="text-body-color dark:text-body-color-dark mb-1 text-sm font-light">
                Email:
              </p>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary mb-3 inline-block text-sm underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </Link>
              <p className="text-body-color dark:text-body-color-dark mt-2 mb-1 text-sm font-light">
                Website:
              </p>
              <Link
                href={CONTACT_WEBSITE}
                className="text-primary inline-block text-sm underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_WEBSITE}
              </Link>
            </CalloutBox>
            <Para>
              <Bold>For data protection inquiries:</Bold> If you are contacting
              us about a data protection or privacy matter, please include
              &quot;Privacy Request&quot; in the subject line to help us route
              your inquiry quickly to the right team.
            </Para>
            <Para>
              Depending on your jurisdiction, you may have the right to lodge a
              complaint with a supervisory authority if you believe we have not
              adequately addressed your concern. We encourage you to contact us
              first so we can work to resolve any issues directly.
            </Para>

            <SubHeading id="jurisdiction-specific">
              Additional Information for Specific Regions
            </SubHeading>
            <Para className="font-medium text-black dark:text-white">
              European Economic Area (EEA) and United Kingdom
            </Para>
            <Para>
              If you are located in the European Economic Area or the United
              Kingdom, you have certain rights under the General Data Protection
              Regulation (GDPR) regarding your personal information.
            </Para>
            <Bullets
              items={[
                "Right to access your personal information",
                "Right to rectify inaccurate information",
                `Right to erasure ("right to be forgotten")`,
                "Right to restrict processing",
                "Right to data portability",
                "Right to object to processing",
              ]}
            />
            <Para>
              To exercise these rights, please contact us at{" "}
              <Link
                href={`mailto:${PRIVACY_EMAIL}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {PRIVACY_EMAIL}
              </Link>
              . We will respond within the timeframe required by applicable law.
            </Para>
            <Para className="font-medium text-black dark:text-white">
              California Residents
            </Para>
            <Para>
              If you are a California resident, the California Consumer Privacy
              Act (CCPA) provides you with specific rights regarding your
              personal information. These include the right to know what
              personal information we collect, the right to delete personal
              information, and the right to opt out of the sale of personal
              information. We do not sell your personal information. To exercise
              your rights, please contact us at the email address above.
            </Para>
            <CalloutBox title="🌎 Other Regions:">
              <Para>
                Regardless of where you are located, we are committed to
                protecting your privacy and handling your information
                responsibly. If your local laws provide additional privacy
                rights, we will respect them to the best of our ability.
              </Para>
            </CalloutBox>

            <SubHeading id="thank-you">Thank You!</SubHeading>
            <Para>
              Thank you for taking the time to read our Privacy Policy. We know
              it&apos;s not the most exciting reading, but we appreciate your
              attention to understanding how we protect your information.
            </Para>
            <Para>
              At Qamar Labs, we&apos;re honored that you&apos;ve chosen our
              mobile encyclopedia as a source of knowledge. We&apos;re committed
              to serving the Ummah with honest, quality applications that
              respect your privacy.
            </Para>
            <div className="border-stroke dark:border-strokedark dark:bg-meta-4 my-4 rounded-lg border bg-gray-50 p-5 text-center">
              <p className="mb-1 text-xl font-semibold text-black dark:text-white">
                جزاك الله خير
              </p>
              <p className="text-body-color dark:text-body-color-dark text-sm font-light">
                Jazak Allah Khair — Thank you for your trust.
              </p>
            </div>
            <Para>
              Please note that in the event of any differences in meaning or
              interpretation between the original English version of this
              Privacy Policy and a translation, the original English version
              takes precedence.
            </Para>

            <SummaryBox
              title="📋 Key Takeaways"
              items={[
                <>
                  <Bold>✓ We&apos;re here to help</Bold> — Contact us anytime
                  with questions
                </>,
                <>
                  <Bold>✓ We&apos;ll notify you of changes</Bold> — Especially
                  major updates
                </>,
                <>
                  <Bold>✓ Your rights matter</Bold> — We respect regional
                  privacy laws
                </>,
                <>
                  <Bold>✓ We don&apos;t track you</Bold> — No marketing, no
                  advertising, no selling data
                </>,
                <>
                  <Bold>✓ Thank you for your trust</Bold> — We&apos;re honored
                  to serve you
                </>,
              ]}
            />
          </section>
        </div>
      </div>
    </section>
  );
}
