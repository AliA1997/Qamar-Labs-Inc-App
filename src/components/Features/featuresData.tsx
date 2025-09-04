import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <div className="relative h-full w-full">
        <Image
          src="/images/features/decentralized.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Decentralized & Community-Owned Architectures",
    paragraph: `
        We design systems that operate without reliance on centralized corporate servers. 
        Our software enables communities to own their data and manage their digital infrastructure collectively, ensuring resilience and self-determination.
      `
  },
  {
    id: 2,
    icon: (
      <div className="relative h-full w-full">
        <Image
          src="/images/features/environment-care.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Resource Stewardship & Optimization Platforms",
    paragraph: `
       We create tools specifically for tracking, managing, and optimizing the use of shared natural and communal resources—such as energy, 
       water, and agricultural produce—promoting conservation and eliminating waste through collective oversight.
      `
  },
  {
    id: 3,
    icon: (
      <div className="relative h-full w-full">
        <Image
          src="/images/features/transparency.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Transparent & Participatory Decision-Making Systems",
    paragraph: `
      Our features include digital frameworks for transparent proposal voting, participatory budgeting, and collaborative planning. 
      This ensures community projects and resources are managed democratically, with every voice having a clear channel to be heard.
    `,
  },
  {
    id: 4,
    icon: (
      <div className="relative h-full w-full">
        <Image
          src="/images/features/low-code.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Accessible, Low-Bandwidth Design",
    paragraph: `
      All our solutions are engineered for maximum accessibility, functioning effectively on older hardware and in areas with limited or expensive internet connectivity. 
      We prioritize universal access over technologically advanced exclusivity.
    `
  },
  {
    id: 5,
    icon: (
      <div className="relative w-full h-full">
        <Image
          src="/images/features/community.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Interoperable Modules for Community Needs",
    paragraph: `
      We provide a suite of integrated, modular tools that can be adopted individually or combined. 
      A community might start with a resource tracker and later integrate a decision-making module, allowing for organic, needs-based growth without vendor lock-in.
    `,
  },
  {
    id: 6,
    icon: (
      <div className="relative w-full h-full">
        <Image
          src="/images/features/intelligence.png"
          alt="image"
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    title: "Actionable Environmental Intelligence",
    paragraph: `
      We transform raw environmental data into clear, actionable insights for local communities. 
      Our features include visualizing local air/water quality, mapping sustainable land use, and providing early warnings for ecological changes, empowering localized responses to global challenges.
    `
  },
];
export default featuresData;
