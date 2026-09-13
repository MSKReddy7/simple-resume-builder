import { useFormContext } from '../../context/FormContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/MultiStepForm.css';
import { validatePersonal } from "../../api/api"
const PersonalDetails = () => {
  const { formData, updateFormData, nextStep } = useFormContext();
  const  showToast  = useToast();

  const handleNext = async() => {
    const data = {
      "fullName": formData.fullName,
      "email": formData.email,
      "phone": formData.phone,
      "address": formData.address,
      "summary": formData.summary
    }
  
    const response = await validatePersonal(data);

    if (response.error) {
      console.error(response.error);
      showToast(response.error.error || "❌ " + response.error, "danger");
    } else {
      showToast('✔️  Personal details saved!', 'success');
      nextStep();
    }
  };


  return (
    <div className="form-content">
      <h2 className="form-title">Personal Details</h2>
      <p className="form-subtitle">Let's start with your basic information</p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-input"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            className="form-input"
            placeholder="1234567890"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-input"
            placeholder="City, Country"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row single">
        <div className="form-group">
          <label className="form-label">Professional Summary</label>
          <textarea
            className="form-textarea"
            placeholder="Brief description about yourself and your career goals..."
            value={formData.summary}
            onChange={(e) => updateFormData({ summary: e.target.value })}
          />
        </div>
      </div>

      <div className="form-navigation">
        <button className="btn btn-next" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
