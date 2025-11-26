import React from "react";
import "./App.css";
import Header from "./components/Header";
import PersonalProjects from "./components/PersonalProjects";
import AboutSection from "./components/AboutSection";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <AboutSection />
      <PersonalProjects />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
