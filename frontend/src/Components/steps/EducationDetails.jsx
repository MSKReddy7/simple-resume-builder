import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/MultiStepForm.css';
import { validateEducation } from '../../api/api';

const EducationDetails = () => {
  const {
    formData,
    addEducation,
    removeEducation,
    updateEducation,
    nextStep,
    prevStep,
  } = useFormContext();

  const showToast  = useToast();

  const handleNext = async() => {
    const data = {
        "education": formData.education
      };
  
    const response = await validateEducation(data);

    if (response.error) {
      console.error(response.error);
      showToast(response.error.error || "❌"+response.error, "danger");
    } else {
      showToast('✔️  Education details saved!', 'success');
      nextStep();
    }
  };

  return (
    <div className="form-content">
      <h2 className="form-title">Education Details</h2>
      <p className="form-subtitle">Add your educational qualifications</p>

      <div className='multi-feilds'>
        {formData.education.map((edu) => (
          <div key={edu.id} className="dynamic-card">
            {edu.id!=1 &&
              <button
              className="card-remove-btn"
              onClick={() => {removeEducation(edu.id); showToast("✔️ Education Feild Removed Successfully")}}
              aria-label="Remove education"
              >
                X
              </button>
            }

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Degree *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="B.Tech in Computer Science"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">College/University *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="University of Technology"
                  value={edu.college}
                  onChange={(e) =>
                    updateEducation(edu.id, { college: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { endDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Grade/Percentage</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="3.8 GPA or 85%"
                  value={edu.grade}
                  onChange={(e) =>
                    updateEducation(edu.id, { grade: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => {addEducation(); showToast("✔️ Education Feild Added Successfully")}}>
        + Add Education
      </button>

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

export default EducationDetails;

