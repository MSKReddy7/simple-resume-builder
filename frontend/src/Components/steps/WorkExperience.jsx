import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/MultiStepForm.css';
import { validateExperience } from '../../api/api';

const WorkExperience = () => {
  const {
    formData,
    addExperience,
    removeExperience,
    updateExperience,
    nextStep,
    prevStep,
  } = useFormContext();
  const showToast = useToast();

  const handleNext = async() => {
    const data = {
        "hasExperience": formData.experience.length > 0 ? "Yes" : "No",
        "experience": formData.experience,
      };
  
    const response = await validateExperience(data);

    if (response.error) {
      console.error(response.error);
      showToast(response.error.error || "❌ "+response.error, "danger");
    } else {
      showToast('✔️ Work experience saved!', 'success');
      nextStep();
    }
  };

  const handleCurrentJobChange = (id, isCurrent) => {
    // If setting to current, uncheck all others
    if (isCurrent) {
      formData.experience.forEach((exp) => {
        if (exp.id !== id && exp.isCurrent) {
          updateExperience(exp.id, { isCurrent: false });
        }
      });
    }
    updateExperience(id, {
      isCurrent,
      endDate: isCurrent
        ? ''
        : formData.experience.find((e) => e.id === id)?.endDate || '',
    });
  };

  return (
    <div className="form-content">
      <h2 className="form-title">Work Experience</h2>
      <p className="form-subtitle">Tell us about your professional journey</p>
      <div className='multi-feilds'>
        {formData.experience.map((exp) => (
          <div key={exp.id} className="dynamic-card">
            <button
              className="card-remove-btn"
              onClick={() => {removeExperience(exp.id); showToast("✔️ Experience Feild Removed Successfully")}}
              aria-label="Remove experience"
            >
              X
            </button>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Senior Software Engineer"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    updateExperience(exp.id, { jobTitle: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Tech Corp"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={exp.endDate}
                  disabled={exp.isCurrent}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <div className="form-checkbox-group">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) =>
                      handleCurrentJobChange(exp.id, e.target.checked)
                    }
                  />
                  <label className="form-label">Currently working here</label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="San Francisco, CA"
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(exp.id, { location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row single">
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(exp.id, { description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => {addExperience(); showToast("✔️ Education Feild Added Successfully")}}>
        + Add Experience
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

export default WorkExperience;
