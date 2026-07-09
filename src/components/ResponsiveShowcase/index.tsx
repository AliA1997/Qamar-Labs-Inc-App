import SectionTitle from "../Common/SectionTitle";

type Showcase = {
  id: number;
  device: string;
  caption: string;
  src: string;
};

const showcases: Showcase[] = [
  {
    id: 1,
    device: "Desktop",
    caption: "MacBook Air",
    src: "/images/responsive/Macbook-Air-claude-constitution.vercel.app.webm",
  },
  {
    id: 2,
    device: "Tablet",
    caption: "iPad Pro 11”",
    src: "/images/responsive/iPad-PRO-11-claude-constitution.vercel.app.webm",
  },
  {
    id: 3,
    device: "Mobile",
    caption: "iPhone 14 Pro Max",
    src: "/images/responsive/iPhone-14-PRO-MAX-claude-constitution.vercel.app.webm",
  },
];

const ResponsiveShowcase = () => {
  return (
    <section id="responsive" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Responsive by Specification"
          paragraph="A system that only works on the screen it was designed on is unfinished. Every interface we ship is specified to hold its shape from a 390px phone to a desktop display — here is the Claude Constitution Creator on all three."
          center
          width="700px"
          mb="80px"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {showcases.map(({ id, device, caption, src }) => (
            <figure key={id} className="w-full">
              <div className="overflow-hidden rounded-md shadow-one dark:shadow-none">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`Claude Constitution Creator running on ${caption}`}
                  className="h-auto w-full"
                >
                  <source src={src} type="video/webm" />
                </video>
              </div>
              <figcaption className="mt-5 text-center">
                <span className="block text-lg font-bold text-black dark:text-white">
                  {device}
                </span>
                <span className="text-body-color dark:text-body-color-dark text-base font-medium">
                  {caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponsiveShowcase;
