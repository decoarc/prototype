import React from "react";
import "./ScrollProgress.css";

const ScrollProgress: React.FC = () => {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" />
    </div>
  );
};

export default ScrollProgress;
