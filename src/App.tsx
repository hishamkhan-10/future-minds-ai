import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Courses />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <CTABanner />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
