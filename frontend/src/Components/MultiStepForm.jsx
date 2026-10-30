import { useFormContext } from "../context/FormContext";
import ProgressBar from "./ProgressBar";
import PersonalDetails from "./steps/PersonalDetails";
import EducationDetails from "./steps/EducationDetails";
import WorkExperience from "./steps/WorkExperience";
import Skills from "./steps/Skills";
import HobbiesStrengths from "./steps/HobbiesStrengths";
import TemplateSelection from "./steps/TemplateSelection";
import "../styles/MultiStepForm.css";
import { Button } from "react-bootstrap";

const MultiStepForm = () => {
    const { currentStep } = useFormContext();

    const testData = {
        PersonalDetails: {
            fullName: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
            address: "City, Country",
            summary: "Brief description about yourself and your career goals..."
        },
        EducationDetails: {
            education: [
                {
                    degree: "Bachelor of Science",
                    college: "University of Example",
                    endDate: "2020-05-15",
                    grade: "3.8 GPA",
                }
            ]
        },
        WorkExperience: {
            experience: [
                {
                    jobTitle: "Software Engineer",
                    company: "Example Corp",
                    startDate: "2020-01-01",
                    endDate: "2020-05-15",
                    location: "San Francisco, CA",
                    description: "Developed and maintained web applications using React and Node.js.",
                    isCurrent: true
                }
            ]
        },
        Skills: {
            skills: [
                { name: "JavaScript", level: 5 }
            ]
        },
        HobbiesStrengths: {
            hobbies: "Reading, Traveling",
            strengths: "Strong problem-solving skills, Team player"
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalDetails PersonalDetails = {testData.PersonalDetails}/>;
            case 2:
                return <EducationDetails EducationDetails = {testData.EducationDetails}/>;
            case 3:
                return <WorkExperience WorkExperience = {testData.WorkExperience}/>;
            case 4:
                return <Skills Skills = {testData.Skills}/>;
            case 5:
                return <HobbiesStrengths HobbiesStrengths = {testData.HobbiesStrengths}/>;
            case 6:
                return <TemplateSelection />;
            default:
                return <PersonalDetails />;
        }
    };

    return (
        <>
            <div className="form-container">
                <div className="form-card">
                    <ProgressBar />
                    {renderStep()}
                </div>

            </div>
        </>
    );
};

export default MultiStepForm;
