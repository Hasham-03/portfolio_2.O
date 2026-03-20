import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

// Minimal navbar without ScrollSmoother; smoother stub for initialFX
export const smoother = {
  paused: (_value: boolean) => {},
  scrollTo: (_target: any, _smooth?: boolean, _position?: any) => {},
} as const;

const Navbar = () => {
  useEffect(() => {
    // No-op effect placeholder; keep for future enhancements if needed.
    return () => {};
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          MH
        </a>
        <a
          href="mailto:hasham332004@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          hasham332004@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
