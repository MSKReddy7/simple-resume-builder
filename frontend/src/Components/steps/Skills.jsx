import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/MultiStepForm.css';
import { validateSkills } from '../../api/api';

const Skills = () => {
  const { formData, addSkill, removeSkill, updateSkill, nextStep, prevStep } =
    useFormContext();
  const showToast  = useToast();

  const handleNext = async() => {
    const data = {
        "skills": formData.skills,
      };
  
    const response = await validateSkills(data);

    if (response.error) {
      console.error(response.error);
      showToast(response.error.error || "❌ "+response.error, "danger");
    } else {
      showToast('✔️  Skills saved!', 'success');
      nextStep();
    }
  };

  const setSkillLevel = (id, level) => {
    updateSkill(id, { level });
  };

  return (
    <div className="form-content">
      <h2 className="form-title">Skills</h2>
      <p className="form-subtitle">What are you good at? Rate your proficiency</p>
      <div className='multi-feilds'>
        {formData.skills.map((skill) => (
          <div key={skill.id} className="skill-row">
            <div className="skill-input">
              <input
                type="text"
                className="form-input"
                placeholder="e.g., JavaScript, Project Management"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              />
            </div>

            <div className="skill-level">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`skill-dot ${skill.level >= level ? 'filled' : ''}`}
                  onClick={() => setSkillLevel(skill.id, level)}
                />
              ))}
            </div>
            {skill.id != 1 &&
              <button
              className="card-remove-btn"
              onClick={() => {removeSkill(skill.id); showToast("✔️ Skill Feild Removed Successfully")}}
              aria-label="Remove skill"
              style={{ position: 'static', marginLeft: '0.5rem' }}
              >
                X
              </button>
            }
            </div>
        ))}
      </div>

      <button className="add-button" onClick={() => {addSkill(); showToast("✔️ Skill Feild Added Successfully")}}>
        + Add Skill
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

export default Skills;
