import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PersonalProjects from "./components/PersonalProjects";
import AboutSection from "./components/AboutSection";
import Features from "./components/Features";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import ParticleWaveBackground from "./components/ParticleWaveBackground";
import ScrollProgress from "./components/ScrollProgress";
import { useScrollEffects } from "./hooks/useScrollEffects";

function App() {
  useScrollEffects();

  return (
    <div className="App">
      <ScrollProgress />
      <ParticleWaveBackground />
      <div className="App-content">
        <Header />
        <Hero />
        <AboutSection />
        <Skills />
        <PersonalProjects />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;
