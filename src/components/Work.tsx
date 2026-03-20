import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Project = {
  title: string;
  category: string;
  tools: string;
  image: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "AI Cloud Assistant",
    category: "Serverless AI Application",
    tools: "AWS Bedrock, API Gateway, Lambda, DynamoDB, Cognito",
    image: "/images/ai-cloud.png",
    github: "https://github.com/Hasham-03/AI-Chatbot",
    demo: "https://main.d33idnq08aawk7.amplifyapp.com/",
  },
  {
    title: "Serverless Image Processing API",
    category: "Cloud Automation",
    tools: "AWS Lambda, S3, Pillow, Python, Boto3",
    image: "/images/image-resizer.jpeg",
    github: "https://github.com/Hasham-03/aws-serverless-image-resizer",
  },
  {
    title: "Automated Cloud Deployment",
    category: "DevOps CI/CD Pipeline",
    tools: "Docker, Terraform, GitHub Actions, AWS ECR, AWS Fargate",
    image: "/images/cicd-pipeline.jpeg",
    github: "https://github.com/Hasham-03/portfolio-fargate",
  },
  {
    title: "AI Resume Builder",
    category: "AI Web Application",
    tools: "Next.js, AWS EC2, Docker, n8n, Caddy",
    image: "/images/resume-builder.jpeg",
    github: "https://github.com/Hasham-03/resume-builder",
  },
  {
    title: "Cloud Portfolio Infrastructure",
    category: "Cloud Hosting & CDN",
    tools: "AWS CloudFront, Amplify, GitHub CI/CD",
    image: "/images/portfolio.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        {project.github ? (
                          <div className="carousel-links">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="disable"
                            >
                              GitHub
                            </a>
                            {project.demo ? (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="disable"
                              >
                                Live demo
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={
                          project.demo ||
                          project.github ||
                          undefined
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
