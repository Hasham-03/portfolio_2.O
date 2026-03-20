import { useEffect, useRef } from "react";
import "./styles/FloatingName.css";

interface CharacterProps {
  char: string;
  index: number;
  delay: number;
}

const Character = ({ char, index, delay }: CharacterProps) => {
  return (
    <span
      className="floating-char"
      style={{
        animationDelay: `${delay}s`,
        "--char-index": index,
      } as React.CSSProperties & { "--char-index": number }}
    >
      {char}
    </span>
  );
};

interface FloatingNameProps {
  text: string;
  className?: string;
}

const FloatingName = ({ text, className = "" }: FloatingNameProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chars = entry.target.querySelectorAll(".floating-char");
            chars.forEach((char: Element) => {
              (char as HTMLElement).classList.add("animate");
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const characters = text.split("");

  return (
    <div ref={containerRef} className={`floating-name-container ${className}`}>
      {characters.map((char, index) => (
        <Character
          key={index}
          char={char === " " ? "\u00A0" : char}
          index={index}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
};

export default FloatingName;
