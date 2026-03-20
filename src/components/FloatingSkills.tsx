import { useEffect, useRef, useState } from "react";
import "./styles/FloatingSkills.css";

interface Skill {
  name: string;
  icon?: string;
}

const skills: Skill[] = [
  { name: "Python" },
  { name: "JavaScript" },
  { name: "AWS" },
  { name: "Lambda" },
  { name: "S3" },
  { name: "EC2" },
  { name: "Bedrock" },
  { name: "Docker" },
  { name: "Terraform" },
  { name: "GitHub Actions" },
  { name: "MongoDB" },
  { name: "DynamoDB" },
  { name: "MySQL" },
  { name: "React.js" },
  { name: "Boto3" },
  { name: "Linux" },
  { name: "Git" },
  { name: "n8n" },
];

interface FloatingSkill extends Skill {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const FloatingSkills = () => {
  const [floatingSkills, setFloatingSkills] = useState<FloatingSkill[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Generate floating skill positions
    const newSkills = skills.map((skill, index) => ({
      ...skill,
      id: index,
      left: Math.random() * 80 + 10,
      top: Math.random() * 40 + 50,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 8,
    }));
    setFloatingSkills(newSkills);

    // Intersection observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        setIsActive(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.15, rootMargin: "100px" }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="floating-skills-container" ref={canvasRef}>
      <div className="floating-skills-header">
        <h2>My Skills</h2>
      </div>

      <div className="floating-skills-canvas" style={{ pointerEvents: isActive ? "auto" : "none" }}>
        {floatingSkills.map((skill) => (
          <div
            key={skill.id}
            className="floating-skill-bubble"
            style={{
              left: `${skill.left}%`,
              "--initial-top": `${skill.top}%`,
              "--float-duration": `${skill.duration}s`,
              "--float-delay": `${skill.delay}s`,
            } as React.CSSProperties & {
              "--initial-top": string;
              "--float-duration": string;
              "--float-delay": string;
            }}
          >
            <span className="skill-text">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingSkills;
