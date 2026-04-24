import React from "react";
import "./App.css";
import Header from "./components/Header";
import PersonalProjects from "./components/PersonalProjects";
import AboutSection from "./components/AboutSection";
import Features from "./components/Features";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import ParticleWaveBackground from "./components/ParticleWaveBackground";

function App() {
  return (
    <div className="App">
      <ParticleWaveBackground />
      <div className="App-content">
        <Header />
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
