import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">

          {/* CLOUD ENGINEERING */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6"/>
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6"/>
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>CLOUD ENGINEERING</h3>
              <h4>Designing Scalable Cloud Systems</h4>

              <p>
                Building cloud-native applications and serverless architectures
                on AWS using event-driven systems and scalable infrastructure.
              </p>

              <h5>Skillset & tools</h5>

              <div className="what-content-flex">
                <div className="what-tags">AWS</div>
                <div className="what-tags">Lambda</div>
                <div className="what-tags">API Gateway</div>
                <div className="what-tags">S3</div>
                <div className="what-tags">DynamoDB</div>
                <div className="what-tags">CloudFront</div>
                <div className="what-tags">IAM</div>
                <div className="what-tags">Serverless</div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>

          {/* DEVOPS */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6"/>
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVOPS & AUTOMATION</h3>
              <h4>Infrastructure & CI/CD Pipelines</h4>

              <p>
                Automating deployments and infrastructure using modern DevOps
                tools. Building containerized environments and CI/CD pipelines
                for scalable cloud applications.
              </p>

              <h5>Skillset & tools</h5>

              <div className="what-content-flex">
                <div className="what-tags">Docker</div>
                <div className="what-tags">Terraform</div>
                <div className="what-tags">GitHub Actions</div>
                <div className="what-tags">CI/CD</div>
                <div className="what-tags">AWS Fargate</div>
                <div className="what-tags">ECR</div>
                <div className="what-tags">Linux</div>
                <div className="what-tags">Kubernetes (Learning)</div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>

          {/* AI APPLICATIONS */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 2)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6"/>
              </svg>
            </div>

            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI APPLICATIONS</h3>
              <h4>LLM & Retrieval Systems</h4>

              <p>
                Developing intelligent applications powered by large language
                models, integrating LLM APIs and building Retrieval-Augmented
                Generation (RAG) systems for knowledge-driven AI solutions.
              </p>

              <h5>Skillset & tools</h5>

              <div className="what-content-flex">
                <div className="what-tags">LLM Integration</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">AWS Bedrock</div>
                <div className="what-tags">AI Agents</div>
                <div className="what-tags">Vector Search</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">API Integration</div>
              </div>

              <div className="what-arrow"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");

  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
