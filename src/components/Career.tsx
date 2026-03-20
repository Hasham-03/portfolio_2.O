import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> journey
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Electronics & Communication Engineering</h4>
                <h5>Engineering Graduate</h5>
              </div>
              <h3> 2022  -  2026</h3>
            </div>

            <p>
              Studied Electronics & Communication Engineering while developing
              strong interest in cloud computing, backend systems and modern
              DevOps practices.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Agent Developer Intern</h4>
                <h5>Rooman Technologies</h5>
              </div>
              <h3>2026</h3>
            </div>

            <p>
              Working on AI agent based systems and automation workflows.
              Building intelligent applications using modern AI tools and cloud
              services while exploring real-world AI integration and deployment.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Agents, Cloud & DevOps Engineer (Freelance)</h4>
                <h5>AWS | Docker | Terraform | CI/CD</h5>
              </div>
              <h3>Present</h3>
            </div>

            <p>
              Developed cloud-native projects including serverless AI
              applications using AWS Bedrock, automated CI/CD pipelines with
              GitHub Actions, containerized deployments using Docker and
              scalable infrastructure using Terraform and AWS services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;