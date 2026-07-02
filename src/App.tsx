'use client';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroHighlights from './components/HeroHighlights';
import About from './components/About';
import CourseCurriculum from './components/CourseCurriculum';
import WhyThisCourseIsDifferent from './components/WhyThisCourseIsDifferent';
import OutcomesAndLogistics from './components/OutcomesAndLogistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroHighlights />
        <About />
        <WhyThisCourseIsDifferent />
        <CourseCurriculum />
        <OutcomesAndLogistics />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
