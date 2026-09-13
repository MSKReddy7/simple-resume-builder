// src/api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/validate";

// const BASE_URL = "https://f4smj01g-8000.inc1.devtunnels.ms/api/validate";

const postRequest = async (endpoint, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}/`, data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return { error: error.response.data };
        }
        return { error: error.message };
    }
};

// Validate Personal
export const validatePersonal = async (personalData) => {
    return await postRequest("personal", personalData);
};

// Validate Education
export const validateEducation = async (educationData) => {
    return await postRequest("education", educationData);
};

// Validate Experience
export const validateExperience = async (experienceData) => {
    return await postRequest("experience", experienceData);
};

// Validate Skills
export const validateSkills = async (skillsData) => {
    return await postRequest("skills", skillsData);
};

// Validate Others
export const validateOthers = async (othersData) => {
    return await postRequest("others", othersData);
};

/* usage example */

// import { validatePersonal } from "./api";

// const handleValidate = async () => {
//   const personalData = {
//     fullName: "Manoj",
//     email: "manoj@example.com",
//     phone: "1234567890",
//     address: "",
//     summary: ""
//   };

// const response = await validatePersonal(personalData);

// if (response.error) {
//   console.error("Validation Error:", response.error);
// } else {
//   console.log("Validation Success:", response);
// }
// };
