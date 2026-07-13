import { Bullets, Para, Section } from "./common";

import { SUPPORT_EMAIL } from "@/constants/contact";

const LAST_UPDATED = "April 17, 2026";
const CONTACT_EMAIL = SUPPORT_EMAIL;

export default function DawaarPrivacyPolicy() {
  return (
    <section className="pb-20 pt-35 md:pt-40 xl:pt-46">
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <div className="mb-12">
          <p className="mb-3 flex items-center gap-3 text-xs font-light uppercase tracking-widest text-body-color dark:text-body-color-dark">
            <span className="inline-block h-px w-6 bg-primary" />
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Dawaar:<br />
            Privacy Policy
          </h1>
          <p className="text-sm font-light text-body-color dark:text-body-color-dark">
            Dawaar Mobile Game
          </p>
        </div>

        <Section title="1. Introduction">
          <Para>
            Welcome to Dawaar <>{`("we", "us", or "our")`}</>. This Privacy Policy
            explains how we collect, use, and protect your information when you
            play our mobile game. By using Dawaar, you agree to the practices
            described here.
          </Para>
        </Section>

        <Section title="2. Information We Collect">
          <Para>We may collect the following types of information:</Para>
          <Bullets
            items={[
              "Player name: A name you choose when starting a game. Stored locally on your device.",
              "Game state data: Progress, scores, and settings stored locally. Multiplayer sessions may be temporarily stored on our servers.",
              "Device identifiers: A randomly generated player ID used to join multiplayer sessions.",
              "Purchase information: Subscription and purchase data handled by RevenueCat. We never store payment card details.",
            ]}
          />
        </Section>

        <Section title="3. How We Use Your Information">
          <Bullets
            items={[
              "Provide and maintain gameplay",
              "Enable multiplayer sessions",
              "Process subscriptions via RevenueCat",
              "Improve performance and fix bugs",
              "We do not sell or rent your data",
            ]}
          />
        </Section>

        <Section title="4. Third-Party Services">
          <Para>Dawaar uses the following third-party services:</Para>
          <Bullets
            items={[
              "RevenueCat — manages subscriptions and purchase validation.",
              "Apple App Store / Google Play — processes subscription payments.",
            ]}
          />
          <Para>
            Dawaar does not use advertising SDKs. Any ads shown in the free
            version are simulated and do not collect advertising identifiers.
          </Para>
        </Section>

        <Section title="5. Data Storage and Security">
          <Para>
            Game data is stored locally on your device. Multiplayer data is
            temporary and deleted after the session ends or after 24 hours of
            inactivity. We use industry-standard security practices to protect
            data in transit and at rest.
          </Para>
        </Section>

        <Section title="6. Children's Privacy">
          <Para>
            Dawaar is designed for players aged 4 and older. We do not
            knowingly collect personal information from children under 13
            beyond what is necessary for gameplay. No account registration is
            required. If you believe a child has provided information through
            the App, please contact us to remove it.
          </Para>
        </Section>

        <Section title="7. Your Rights">
          <Para>Depending on your jurisdiction, you may have the right to:</Para>
          <Bullets
            items={[
              "Access your personal data",
              "Request correction or deletion",
              "Opt out of certain processing (where applicable)",
            ]}
          />
          <Para>
            Because most data is stored locally, you can delete it at any time
            by uninstalling the app.
          </Para>
        </Section>

        <Section title="8. Changes to This Policy">
          <Para>
            We may update this Privacy Policy occasionally. Significant changes
            will update the <>{`"Last updated"`}</> date at the top of this page.
            Continued use of the game after changes constitutes acceptance of
            the revised policy.
          </Para>
        </Section>

        <Section title="9. Contact Us">
          <Para>
            If you have any questions about this Privacy Policy, contact us at:
          </Para>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block text-sm text-primary underline-offset-4 transition hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </Section>
      </div>
    </section>
  );
}