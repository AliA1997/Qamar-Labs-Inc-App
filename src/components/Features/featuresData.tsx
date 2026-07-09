import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <Image
        src="/images/features/decentralized.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "Architecture Without Lock-In",
    paragraph: `
        We build on open standards and portable foundations, so the system you pay for stays yours.
        No vendor holds your data hostage, and no roadmap but your own decides when you move.
      `
  },
  {
    id: 2,
    icon: (
      <Image
        src="/images/features/environment-care.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "Continuous Wisdom & Care",
    paragraph: `
       Shipping is the beginning, not the finish line. We stay with a product as it meets the world—tending to it,
       correcting course, and applying what each release teaches us to the next one.
      `
  },
  {
    id: 3,
    icon: (
      <Image
        src="/images/features/transparency.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "A Spec-Driven Approach",
    paragraph: `
      Every problem begins as a written specification: the intent, the constraints, and what "done" means, agreed before a line of code exists.
      Ambiguity is resolved on paper, where it is cheap, rather than in production, where it is not.
    `,
  },
  {
    id: 4,
    icon: (
      <Image
        src="/images/features/low-code.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "Accessible by Default",
    paragraph: `
      Our solutions are engineered to work on modest hardware, over slow connections, and for people using assistive technology.
      We treat universal access as a requirement of the specification, never as a later enhancement.
    `
  },
  {
    id: 5,
    icon: (
      <Image
        src="/images/features/community.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "Systems That Stay Iterable",
    paragraph: `
      The AI era rewards codebases that can be understood and changed quickly—by your team and by the tools they work alongside.
      We keep boundaries clear and intent documented, so your system remains cheap to evolve long after we hand it over.
    `,
  },
  {
    id: 6,
    icon: (
      <Image
        src="/images/features/intelligence.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    title: "Cutting Edge, Deliberately",
    paragraph: `
      New expectations demand new capability, but novelty is not a strategy.
      We adopt emerging tools once we can explain what they earn you, and we build so that today's cutting edge is not tomorrow's liability.
    `
  },
];
export default featuresData;
