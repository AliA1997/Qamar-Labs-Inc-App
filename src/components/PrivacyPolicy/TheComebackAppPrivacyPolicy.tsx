import { Bullets, Para, Section } from "./common";

const LAST_UPDATED = "May 2, 2026";
const APP_NAME = "The Comeback App Time Tracker";
const CONTACT_EMAIL = "support@qamarlabsllc.com";


export default function ComebackPrivacyPolicyPage() {
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
            The Comeback App:<br/>
            Privacy Policy
          </h1>
          <p className="text-sm font-light text-body-color dark:text-body-color-dark">
            {APP_NAME}
          </p>
        </div>

        <Section title="Overview">
          <Para>
            {APP_NAME} ("the App", "we", "our") is committed to protecting
            your privacy. This policy explains what information is collected,
            how it is used, and your rights regarding that information.
          </Para>
          <Para>
            The App is designed for developers re-entering the tech industry.
            It helps you track tasks, manage focus timers, and review
            productivity history.
          </Para>
        </Section>

        <Section title="Information We Collect">
          <Para>
            The App stores all task and timer data locally on your device using
            AsyncStorage. No personal data is transmitted to our servers.
            Specifically, the App stores:
          </Para>
          <Bullets
            items={[
              "Tasks you create (titles, descriptions, categories, durations)",
              "Timer sessions and completion history",
              "Daily productivity records and streaks",
              "App preferences (e.g. whether you have seen the onboarding screen)",
            ]}
          />
        </Section>

        <Section title="Advertising">
          <Para>
            The App integrates the AppLovin MAX and BidMachine advertising SDKs
            (active in native builds only). These third-party SDKs may collect:
          </Para>
          <Bullets
            items={[
              "Device identifiers (e.g. IDFA on iOS, Android Advertising ID)",
              "IP address and approximate location",
              "Device model, OS version, and screen size",
              "App usage data for ad targeting purposes",
            ]}
          />
          <Para>
            You can limit ad tracking in your device settings (iOS: Settings ›
            Privacy › Tracking; Android: Settings › Google › Ads). For more
            information, see AppLovin&apos;s privacy policy at applovin.com/privacy
            and BidMachine&apos;s policy at bidmachine.io/privacy-policy.
          </Para>
          <Para>
            Interstitial ads are only shown during idle state (when no timer is
            active) — never during focus sessions.
          </Para>
        </Section>

        <Section title="Data Sharing">
          <Para>
            We do not sell, rent, or share your personal data with third
            parties except:
          </Para>
          <Bullets
            items={[
              "Ad SDKs as described above (AppLovin MAX, BidMachine)",
              "If required by law or legal process",
            ]}
          />
        </Section>

        <Section title="Data Retention & Deletion">
          <Para>
            All data is stored on your device. You can delete all App data at
            any time by uninstalling the App, which removes all locally stored
            information.
          </Para>
        </Section>

        <Section title="Children's Privacy">
          <Para>
            The App is not directed to children under 13 years of age. We do
            not knowingly collect personal information from children. If you
            believe a child has provided information through the App, please
            contact us to remove it.
          </Para>
        </Section>

        <Section title="Your Rights">
          <Para>
            Depending on your jurisdiction, you may have the right to:
          </Para>
          <Bullets
            items={[
              "Access the personal data we hold about you",
              "Request deletion of your data",
              "Opt out of interest-based advertising",
            ]}
          />
          <Para>
            Since all your task and timer data is stored only on your device,
            you have direct control over it at all times.
          </Para>
        </Section>

        <Section title="Changes to This Policy">
          <Para>
            We may update this Privacy Policy from time to time. The updated
            version will be accessible within the App. Continued use of the App
            after changes constitutes acceptance of the revised policy.
          </Para>
        </Section>

        <Section title="Contact">
          <Para>If you have any questions about this Privacy Policy, contact us at:</Para>
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