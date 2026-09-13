import { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    useEffect(() => {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(
                    this.getAttribute("href")
                );
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }, []);

    const navigateTo = useNavigate();

    return (
        <div className="app">
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="badge">
                            Professional Resume Builder
                        </span>

                        <h1 className="hero-title">
                            Craft{" "}
                            <span className="gradient-text">Professional</span>{" "}
                            Resumes
                        </h1>

                        <p className="hero-description">
                            Create job-winning resumes with expertly designed
                            templates. ATS-friendly, recruiter-approved, and
                            tailored to your career goals.
                        </p>

                        <div className="hero-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigateTo("/create")}
                            >
                                Start Building
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>

                    </div>

                    <div className="hero-illustration">
                        <div className="illustration-glow"></div>
                        <svg
                            className="illustration-image"
                            viewBox="0 0 400 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="50"
                                y="50"
                                width="300"
                                height="400"
                                rx="20"
                                fill="white"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                            />

                            <circle cx="150" cy="120" r="30" fill="#8B5CF6" />
                            <circle cx="150" cy="120" r="15" fill="white" />

                            <rect
                                x="80"
                                y="100"
                                width="40"
                                height="4"
                                rx="2"
                                fill="#C4B5FD"
                            />
                            <rect
                                x="80"
                                y="110"
                                width="35"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="118"
                                width="30"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />

                            <rect
                                x="200"
                                y="105"
                                width="70"
                                height="4"
                                rx="2"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="200"
                                y="115"
                                width="50"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />

                            <circle cx="320" cy="100" r="8" fill="#FF6B4A" />
                            <polygon
                                points="305,115 310,105 315,115"
                                fill="#FF6B4A"
                            />
                            <circle cx="325" cy="130" r="6" fill="#FF6B4A" />

                            <circle cx="90" cy="310" r="5" fill="#10B981" />

                            <rect
                                x="80"
                                y="180"
                                width="240"
                                height="6"
                                rx="3"
                                fill="#8B5CF6"
                            />
                            <rect
                                x="80"
                                y="200"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="210"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="220"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />

                            <rect
                                x="80"
                                y="250"
                                width="80"
                                height="5"
                                rx="2.5"
                                fill="#8B5CF6"
                            />
                            <rect
                                x="80"
                                y="270"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="280"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="290"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="300"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="310"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="320"
                                width="180"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />

                            <rect
                                x="80"
                                y="350"
                                width="80"
                                height="5"
                                rx="2.5"
                                fill="#8B5CF6"
                            />
                            <rect
                                x="80"
                                y="370"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="380"
                                width="240"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                            <rect
                                x="80"
                                y="390"
                                width="180"
                                height="3"
                                rx="1.5"
                                fill="#DDD6FE"
                            />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="features-header">
                    <h2 className="features-title">
                        Why Choose{" "}
                        <span className="gradient-text">ResumeBuilder</span>?
                    </h2>
                    <p className="features-subtitle">
                        Everything you need to create a professional resume that
                        stands out
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon purple">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Lightning Fast</h3>
                        <p className="feature-description">
                            Create professional resumes in under 5 minutes with
                            our streamlined process
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon pink">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Pro Templates</h3>
                        <p className="feature-description">
                            Choose from dozens of recruiter-approved,
                            industry-specific templates
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon orange">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Instant Export</h3>
                        <p className="feature-description">
                            Download high-quality PDFs instantly with perfect
                            formatting
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta" id="cta">
                <div className="cta-container">
                    <div className="cta-glow"></div>
                    <div className="cta-card">
                        <h2 className="cta-title">
                            Ready to Build Your{" "}
                            <span className="gradient-text">
                                Standout Resume
                            </span>
                            ?
                        </h2>
                        <p className="cta-description">
                            Join thousands of professionals who landed their
                            dream jobs with our platform
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigateTo("/create")}
                        >
                            Start Building Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p className="footer-text">
                    Crafted with
                    <svg
                        className="heart-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    by{" "}
                    <a
                        href="https://hexogon.digital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        resumebuilder@2025
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Home;
