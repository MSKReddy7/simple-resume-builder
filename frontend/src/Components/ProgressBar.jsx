import React from 'react';
import { useFormContext } from '../context/FormContext';
import '../styles/MultiStepForm.css';

const steps = [
  { number: 1, label: 'Personal' },
  { number: 2, label: 'Education' },
  { number: 3, label: 'Experience' },
  { number: 4, label: 'Skills' },
  { number: 5, label: 'Hobbies' },
  { number: 6, label: 'Template' },
];

const ProgressBar = () => {
  const { currentStep } = useFormContext();

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-steps">
        <div className="progress-bar-line">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        {steps.map((step) => (
          <div
            key={step.number}
            className={`progress-step ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
          >
            <div
              className={`progress-circle ${currentStep === step.number ? 'active' : ''} ${
                currentStep > step.number ? 'completed' : ''
              }`}
            >
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <div className="progress-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
