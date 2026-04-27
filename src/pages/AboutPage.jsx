import Hero from "../components/about/Hero.jsx";
import Who from "../components/about/WhoWeAre.jsx";
import Philosophy from "../components/about/TrainingPhilosophy.jsx";
import GymValues from "../components/about/GymValues.jsx";
import FacilitiesPreview from "../components/about/FacilitiesPreview.jsx";
import Contact from "../components/about/Contact.jsx";

function About(){
  return (
    <>
      <Hero/>
      <Who/>
      <Philosophy/>
      <GymValues/>
      <FacilitiesPreview/>
      {/* <Contact/> */}
    </>
  )
}

export default About;