import Hero from '../components/sections/Hero';
import Header from '../components/layout/Header';
import SectionBar from "../components/layout/SectionBar";
import Gallery from "../components/sections/Gallery";
import About from '../components/sections/About';
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-white pt-24">
      <Header />
      <Hero />
      <SectionBar title="Gallery" />
      <Gallery />
      <SectionBar title="About Me" />
      <About />
      <Footer />
    </div>
  );
}