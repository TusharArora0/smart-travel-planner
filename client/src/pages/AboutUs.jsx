import React, { useEffect } from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Varun Rawat",
      role: "Frontend Developer",
      image: "/images/varun.jpg",
      description: "BCA Student at JIMS VK, specializing in React.js and modern frontend development.",
      linkedin: "https://www.linkedin.com/in/varun-rawat-3082b7265?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/VarunRawatt/"
    },
    {
      name: "Tushar Arora",
      role: "Backend Developer",
      image: "/images/Tushar.jpg",
      description: "BCA Student at JIMS VK, expert in Node.js and database management.",
      linkedin: "https://www.linkedin.com/in/tushar-arora-1aa02731a/",
      github: "https://github.com/TusharArora0"
    },
    {
      name: "Vansh Jain",
      role: "Documentation And Testing",
      image: "/images/vansh.jpg",
      description: "BCA Student at JIMS VK, passionate about Testing Web applications.",
      linkedin: "https://www.linkedin.com/in/vansh-jain-823706345/",
      github: "https://github.com/VanshJan"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Building the future of travel planning with AI</p>
      </div>

      <div className="about-content">
        <section className="project-info">
          <h2>Our Project</h2>
          <p>
            Welcome to the Uttarakhand Trip Planner - an innovative AI-powered travel planning platform
            developed by Tushar Arora, Varun Rawat And Vansh Jain BCA students from JIMS Vasant Kunj, New Delhi. This project is a
            comprehensive solution that combines frontend development, backend architecture, and AI
            integration to promote tourism in the beautiful state of Uttarakhand.
          </p>
          <div className="project-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🎯</span>
              <h3>Mission</h3>
              <p>To revolutionize travel planning in Uttarakhand using artificial intelligence</p>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🔮</span>
              <h3>Vision</h3>
              <p>Making Uttarakhand tourism more accessible and personalized for every traveler</p>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎓</span>
              <h3>Academic Project</h3>
              <p>Solo project developed as part of BCA curriculum at JIMS Vasant Kunj</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <p>The minds behind the Uttarakhand Trip Planner</p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <p>{member.description}</p>
                  <div className="social-links">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-details">
          <h2>Project Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <h3>Technologies Used</h3>
              <ul>
                <li>React.js for Frontend</li>
                <li>Node.js & Express for Backend</li>
                <li>AI/ML for Trip Recommendations</li>
                <li>MongoDB for Database</li>
              </ul>
            </div>
            <div className="detail-item">
              <h3>Features</h3>
              <ul>
                <li>AI-Powered Trip Planning</li>
                <li>Personalized Recommendations</li>
                <li>Interactive Maps</li>
                <li>Real-time Weather Updates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="acknowledgment">
          <h2>Acknowledgments</h2>
          <p>
            We extend our sincere gratitude to the Government of Uttarakhand for their support
            and to our mentors at JIMS Vasant Kunj for their guidance throughout this project.
          </p>
        </section>

        <div className="contact-section">
          <h2>Get in Touch</h2>
          <p>Have questions about our project? We'd love to hear from you!</p>
          <button className="contact-btn">
            Contact Us
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;