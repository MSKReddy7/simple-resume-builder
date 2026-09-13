import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/MultiStepForm.css";
import Template1 from "../Template1";
import Template2 from "../Template2";
import Template3 from "../Template3";
import { Button, Modal } from "react-bootstrap";

const templates = [
    {
        id: 1,
        name: "Modern",
        icon: "📄",
        img:"./src/imgs/t1.jpg",
        component: <Template1 />,
    },
    {
        id: 2,
        name: "Creative",
        icon: "🎨",
        img: "./src/imgs/t2.jpg",
        component: <Template2/>,
    },
    {
        id: 3,
        name: "Professional",
        icon: "💼",
        img:"./src/imgs/t3.jpg",
        component: <Template3/>,
    },
];


const TemplateSelection = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const { formData, updateFormData, prevStep } = useFormContext();
    const showToast = useToast();

    const handleTemplateSelect = (id) => {
        updateFormData({ selectedTemplate: id });
    };

    const handleSubmit = () => {
        if (!formData.selectedTemplate) {
            showToast("Please select a template", "danger");
            return;
        }
        setShow(true);
    };

    return (
        <div className="form-content">
            <h2 className="form-title">Choose Your Template</h2>
            <p className="form-subtitle">
                Select a design that matches your style
            </p>

            <div className="templates-grid">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-card ${
                            formData.selectedTemplate === template.id
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                        <div className="template-preview">
                            <img src={`${template.img}`} height="480px" width="350px" alt="User" />
                        </div>
                        <div className="template-name">{template.name}</div>
                    </div>
                ))}
            </div>

            <div className="form-navigation">
                <button className="btn btn-back" onClick={prevStep}>
                    ← Back
                </button>
                <button className="btn btn-submit" onClick={handleSubmit}>
                    Preview Resume 👀
                </button>
            </div>

            <Modal show={show} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Resume Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    {formData.selectedTemplate &&
                        templates.find((t) => t.id === formData.selectedTemplate)?.component
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default TemplateSelection;
