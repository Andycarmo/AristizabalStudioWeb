import Hero from '../components/sections/Hero';
import Header from '../components/layout/Header';
import SectionBar from "../components/layout/SectionBar";
import Works from "../components/sections/Works";
import Shop from "../components/sections/Shop";
import InsideStudio from "../components/sections/InsideStudio/InsideStudio";
import About from '../components/sections/About';
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-white pt-24">
      <Header />
      <Hero />
      <SectionBar title="" />
      <Works />
      <SectionBar title="" />
      <Shop />
      <SectionBar title="" />
      <About />
      <InsideStudio />
      <Footer />
    </div>
  );
}