import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/MultiStepForm.css';
import { validateOthers } from '../../api/api';

const HobbiesStrengths = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const showToast  = useToast();

  const handleNext = async() => {
        const data = {
          "others":{
            "hobbies":formData.hobbies,
            "strengths":formData.strengths,
          }
        };
      
        const response = await validateOthers(data);
    
        if (response.error) {
          console.error(response.error);
          showToast(response.error.error || "❌ "+response.error, "danger");
        } else {
          showToast('✔️ Hobbies and strengths saved!', 'success');
          nextStep();
        }
  };

  return (
    <div className="form-content">
      <h2 className="form-title">Hobbies & Strengths</h2>
      <p className="form-subtitle">
        Show your personality and what makes you unique
      </p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Hobbies & Interests</label>
          <textarea
            className="form-textarea"
            placeholder="Photography, Reading, Hiking, Playing Guitar..."
            value={formData.hobbies}
            onChange={(e) => updateFormData({ hobbies: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Personal Strengths</label>
          <textarea
            className="form-textarea"
            placeholder="Leadership, Problem Solving, Team Collaboration, Communication..."
            value={formData.strengths}
            onChange={(e) => updateFormData({ strengths: e.target.value })}
          />
        </div>
      </div>

      <div className="form-navigation">
        <button className="btn btn-back" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-next" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default HobbiesStrengths;
