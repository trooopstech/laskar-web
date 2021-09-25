import Benefit from "./benefit";
import Faq from "./faq";
import Feature from "./feature";
import Hero from "./hero";

const Landing = () => {
  return (
    <div className="w-full">
      <Hero />
      <Feature />
      <Benefit />
      <Faq />
    </div>
  );
};

export default Landing;
