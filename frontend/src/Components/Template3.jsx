import { useRef } from "react";
import { useFormContext } from "../context/FormContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Template3.css";

const Template3 = () => {
    const { formData } = useFormContext();
    const resumeRef = useRef();

    const handleDownloadPDF = async () => {
        const input = resumeRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;

        let newWidth = pdfWidth;
        let newHeight = pdfWidth / imgRatio;

        if (newHeight > pdfHeight) {
            newHeight = pdfHeight;
            newWidth = pdfHeight * imgRatio;
        }

        const xOffset = (pdfWidth - newWidth) / 2;
        pdf.addImage(imgData, "PNG", xOffset, 0, newWidth, newHeight);
        pdf.save(`${formData.fullName || "resume"}.pdf`);
    };

    return (
        <div className="resume-container">
            <div className="resume-wrapper-template3" ref={resumeRef}>
                {/* ===== HEADER ===== */}
                <header className="header">
                    <h1>{formData.fullName || "Your Name"}</h1>
                    <p>
                        {formData.email &&
                            `${formData.email} | `}
                        {formData.phone &&
                            `${formData.phone} | `}
                        {formData.address}
                    </p>
                </header>

                {/* ===== SUMMARY ===== */}
                {formData.summary && (
                    <section>
                        <h2>Professional Summary</h2>
                        <p>{formData.summary}</p>
                    </section>
                )}

                {/* ===== EDUCATION ===== */}
                {formData.education?.length > 0 && (
                    <section>
                        <h2>Education</h2>
                        {formData.education.map((edu, idx) => (
                            <div key={idx}>
                                <h4>{edu.degree}</h4>
                                <p>
                                    {edu.college} ({edu.endDate})
                                </p>
                                {edu.grade && <p>Grade: {edu.grade}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ===== EXPERIENCE ===== */}
                {formData.experience?.length > 0 && (
                        <section>
                            <h2>Experience</h2>
                            {formData.experience.map((exp, idx) => (
                                <div key={idx}>
                                    <h4>
                                        {exp.jobTitle || "Position"}{" "}
                                        {exp.company && `- ${exp.company}`}
                                    </h4>
                                    <p>
                                        {exp.startDate && `${exp.startDate} - `}
                                        {exp.isCurrent
                                            ? "Present"
                                            : exp.endDate}
                                        {exp.location && ` | ${exp.location}`}
                                    </p>
                                    {exp.description && (
                                        <p>{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                {/* ===== SKILLS ===== */}
                {formData.skills?.length > 0 && (
                    <section>
                        <h2>Skills</h2>
                        <div className="skills-container">
                            {formData.skills.map((skill, idx) => (
                                <div className="skill-row" key={idx}>
                                    <span className="skill-name">
                                        {skill.name}
                                    </span>
                                    <div className="skill-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`dot ${
                                                    i < skill.level
                                                        ? "filled"
                                                        : ""
                                                }`}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ===== STRENGTHS ===== */}
                {formData.others?.strengths && (
                    <section>
                        <h2>Strengths</h2>
                        <ul>
                            {formData.others.strengths
                                .split(",")
                                .map((str, i) => (
                                    <li key={i}>{str.trim()}</li>
                                ))}
                        </ul>
                    </section>
                )}

                {/* ===== HOBBIES ===== */}
                {formData.others?.hobbies && (
                    <section>
                        <h2>Hobbies</h2>
                        <ul>
                            {formData.others.hobbies
                                .split(",")
                                .map((hob, i) => (
                                    <li key={i}>{hob.trim()}</li>
                                ))}
                        </ul>
                    </section>
                )}
            </div>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
        </div>
    );
};

export default Template3;
