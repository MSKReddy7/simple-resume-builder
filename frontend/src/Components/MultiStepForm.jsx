import { useFormContext } from "../context/FormContext";
import ProgressBar from "./ProgressBar";
import PersonalDetails from "./steps/PersonalDetails";
import EducationDetails from "./steps/EducationDetails";
import WorkExperience from "./steps/WorkExperience";
import Skills from "./steps/Skills";
import HobbiesStrengths from "./steps/HobbiesStrengths";
import TemplateSelection from "./steps/TemplateSelection";
import "../styles/MultiStepForm.css";

const MultiStepForm = () => {
    const { currentStep } = useFormContext();

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalDetails />;
            case 2:
                return <EducationDetails />;
            case 3:
                return <WorkExperience />;
            case 4:
                return <Skills />;
            case 5:
                return <HobbiesStrengths />;
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
