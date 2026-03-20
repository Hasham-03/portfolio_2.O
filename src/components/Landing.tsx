import { PropsWithChildren } from "react";
import FloatingName from "./FloatingName";
import "./styles/Landing.css";




const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2><FloatingName text="Hello! I'm" className="landing-intro-text" /></h2>
            <h1>
              <FloatingName text="MOHAMMED" className="landing-name-line" />
              <br />
              <FloatingName text="HASHAM" className="landing-name-line landing-name-highlight" />
            </h1>
          </div>
          
          <div className="landing-info">
            <h3>AI-Powered Cloud & DevOps</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Developer</div>
              <div className="landing-h2-2">Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
