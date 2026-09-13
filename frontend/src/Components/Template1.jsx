import React, { useRef } from "react";
import { useFormContext } from "../context/FormContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Template1.css";
import { useToast } from "../context/ToastContext";

const Template1 = () => {

    const showToast = useToast();

    const { formData } = useFormContext();
    const resumeRef = useRef();

    const handleDownloadPDF = async () => {
        showToast("Download Will Begin Shortly....","success");
        const input = resumeRef.current;
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
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
            <div className="resume-wrapper"  ref={resumeRef}>
                {/* ===== Header ===== */}
                <div className="resume-header text-center">
                    <h1 className="name">{formData.fullName || "Your Name"}</h1>
                    <p className="contact">
                        {formData.email && <>{formData.email} | </>}
                        {formData.phone && <>{formData.phone} | </>}
                        {formData.address}
                    </p>
                </div>

                {/* ===== Summary ===== */}
                {formData.summary && (
                    <section className="resume-section">
                        <h2>Professional Summary</h2>
                        <p>{formData.summary}</p>
                    </section>
                )}

                {/* ===== Education ===== */}
                {formData.education?.length > 0 && (
                    <section className="resume-section">
                        <h2>Education</h2>
                        {formData.education.map((edu) => (
                            <div key={edu.id}>
                                <h4>{edu.degree}</h4>
                                <p>
                                    {edu.college && `${edu.college}, `}
                                    {edu.endDate && `${edu.endDate}`}
                                </p>
                                {edu.grade && <p>Grade: {edu.grade}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ===== Experience ===== */}
                {formData.experience?.length > 0 && (
                    <section className="resume-section">
                        <h2>Experience</h2>
                        {formData.experience.map((exp) => (
                            <div key={exp.id}>
                                <h4>
                                    {exp.jobTitle || "Job Title"}{" "}
                                    {exp.company && `- ${exp.company}`}
                                </h4>
                                <p>
                                    {exp.startDate && `${exp.startDate} - `}
                                    {exp.isCurrent ? "Present" : exp.endDate}
                                    {exp.location && ` | ${exp.location}`}
                                </p>
                                {exp.description && <p>{exp.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ===== Skills ===== */}
                {formData.skills?.length > 0 && (
                    <section className="resume-section">
                        <h2>Skills</h2>
                        <ul className="skills-list">
                            {formData.skills.map((skill) => (
                                <li key={skill.id} className="skill-item">
                                    <span className="skill-name">{skill.name}</span>
                                    <div className="skill-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`dot ${i < skill.level ? "filled" : ""}`}
                                            ></span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* ===== Strengths ===== */}
                {formData.strengths && (
                    <section className="resume-section">
                        <h2>Strengths</h2>
                        <p>{formData.strengths}</p>
                    </section>
                )}

                {/* ===== Hobbies ===== */}
                {formData.hobbies && (
                    <section className="resume-section">
                        <h2>Hobbies</h2>
                        <p>{formData.hobbies}</p>
                    </section>
                )}
            </div>

                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleDownloadPDF}>
                        Download PDF
                    </button>
                </div>

        </div>
    );
};

export default Template1;
