import { useRef } from "react";
import { useFormContext } from "../context/FormContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Template2.css";

const Template2 = () => {
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
            <div className="resume-wrapper-template2" ref={resumeRef}>
                {/* ============ SIDEBAR ============ */}
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1>{formData.fullName || "Your Name"}</h1>
                    </div>

                    <div className="sidebar-section">
                        <h3>Contact</h3>
                        {formData.email && <p>📧 {formData.email}</p>}
                        {formData.phone && <p>📱 {formData.phone}</p>}
                        {formData.address && <p>📍 {formData.address}</p>}
                    </div>

                    {formData.skills?.length > 0 && (
                        <div className="sidebar-section">
                            <h3>Skills</h3>
                            <ul>
                                {formData.skills.map((skill) => (
                                    <li key={skill.id} className="skill-item">
                                        <div className="skill-name">{skill.name}</div>
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
                        </div>
                    )}

                    {formData.strengths && (
                        <div className="sidebar-section">
                            <h3>Strengths</h3>
                            <ul>
                                {formData.strengths.split(",").map((str, i) => (
                                    <li key={i}>{str.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {formData.hobbies && (
                        <div className="sidebar-section">
                            <h3>Hobbies</h3>
                            <ul>
                                {formData.hobbies.split(",").map((hob, i) => (
                                    <li key={i}>{hob.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* ============ MAIN CONTENT ============ */}
                <div className="main-content">
                    {formData.summary && (
                        <section>
                            <h2>Professional Summary</h2>
                            <p>{formData.summary}</p>
                        </section>
                    )}

                    {formData.education?.length > 0 && (
                        <section>
                            <h2>Education</h2>
                            {formData.education.map((edu) => (
                                <div key={edu.id}>
                                    <h4>{edu.degree}</h4>
                                    <p>{edu.college}, {edu.endDate}</p>
                                    {edu.grade && <p>Grade: {edu.grade}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {formData.experience?.length > 0 && (
                        <section>
                            <h2>Experience</h2>
                            {formData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <h4>{exp.jobTitle} {exp.company && `- ${exp.company}`}</h4>
                                    <p>
                                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                                        {exp.location && ` | ${exp.location}`}
                                    </p>
                                    {exp.description && <p>{exp.description}</p>}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleDownloadPDF}>
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default Template2;
