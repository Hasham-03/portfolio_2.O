import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { useEffect, useRef } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const boxes = entry.target.querySelectorAll(".contact-box");
            boxes.forEach((box: Element, index: number) => {
              (box as HTMLElement).style.animationDelay = `${index * 0.15}s`;
              (box as HTMLElement).classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className="contact-section section-container" id="contact" ref={contactRef}>
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:hasham332004@gmail.com" data-cursor="disable">
                hasham332004@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>BE in Electronics & Communication Engineering</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Hasham-03"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-hasham-38765a27a"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://x.com/Hasham334"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/mohammed_hasham_03/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Mohammed Hasham</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
