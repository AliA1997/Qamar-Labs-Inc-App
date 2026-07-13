import SectionTitle from "../Common/SectionTitle";
import Reveal from "../Common/Reveal";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="What You Get"
            paragraph="Six commitments shape every system we ship — from the specification we write before the first line of code, to the software you are still changing years later."
            center
          />

          <Reveal
            staggerChildren
            staggerDelay={80}
            className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Features;
