import React, { createContext, useContext, useEffect, useState } from 'react';

const FormContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   summary: '',
  //   education: [{id:"1",degree:"",college:"",endDate:"",grade:""},],
  //   experience: [],
  //   skills: [{id:"1",name:"",level:0},],
  //   hobbies: '',
  //   strengths: '',
  //   selectedTemplate: null,
  // });
  
  const [formData, setFormData] = useState(
    {
      "fullName": "Chirla Manoj Sai Kumar Reddy",
      "email": "manojreddy@gmail.com",
      "phone": "9876543210",
      "address": "Guntur, Andhra Pradesh, India",
      "summary": "Passionate and detail-oriented software engineer with strong knowledge in React, Bootstrap, and modern web development. Dedicated to creating responsive and user-friendly applications with clean code and efficient logic.",
      "education": [
          {
              "id": "1763067102518",
              "degree": "B.Tech in Computer Science and Engineering",
              "college": "VIT University, Vellore",
              "endDate": "2024-10-10",
              "grade": "8.6 CGPA"
          },
          {
              "id": "1763067159670",
              "degree": "Intermediate (MPC)",
              "college": "Narayana Junior College, Vijayawada",
              "endDate": "2020-10-10",
              "grade": "95%"
          }
      ],
      "experience": [
          {
              "id": "1763067195433",
              "jobTitle": "Frontend Developer",
              "company": "TechNova Pvt. Ltd.",
              "startDate": "2023-10-10",
              "endDate": "",
              "isCurrent": true,
              "location": "Hyderabad, India",
              "description": "Developing responsive UI using React.js and Bootstrap, improving performance by 30% through component optimization."
          },
          {
              "id": "1763067370326",
              "jobTitle": "Web Development Intern",
              "company": "CodeCrafters Labs",
              "startDate": "2023-10-10",
              "endDate": "1101-02-02",
              "isCurrent": false,
              "location": "Remote",
              "description": "Assisted in developing internal dashboards and API integration using RESTful architecture with Axios and Node.js"
          }
      ],
      "skills": [
          {
              "id": "1763067507443",
              "name": "React.js",
              "level": 5
          },
          {
              "id": "1763067528141",
              "name": "Bootstrap",
              "level": 4
          },
          {
              "id": "1763067541786",
              "name": "Node.js",
              "level": 3
          },
          {
              "id": "1763067552269",
              "name": "MongoDB",
              "level": 3
          },
          {
              "id": "1763067561025",
              "name": "Git & GitHub",
              "level": 4
          }
      ],
      "hobbies": "Chess, Blogging, Music, Open Source Contribution",
      "strengths": "Problem Solving, Adaptability, Creative Thinking, Team Collaboration",
      "selectedTemplate": null
  }
  );

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ---------- EDUCATION ----------
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      college: '',
      endDate: '',
      grade: '',
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateEducation = (id, data) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  // ---------- EXPERIENCE ----------
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      description: '',
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const updateExperience = (id, data) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  // ---------- SKILLS ----------
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 0,
    };
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const removeSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const updateSkill = (id, data) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, ...data } : skill
      ),
    }));
  };

  useEffect(() => {
      console.log("Form Data Updated:", formData);
    }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        nextStep,
        prevStep,
        setCurrentStep,
        addEducation,
        removeEducation,
        updateEducation,
        addExperience,
        removeExperience,
        updateExperience,
        addSkill,
        removeSkill,
        updateSkill,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
