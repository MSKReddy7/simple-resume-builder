import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./Components/MultiStepForm";
import { FileText } from "lucide-react";

function App() {
    const navigateTo = useNavigate();
    return (
        <>
            <div className="hell">
                <div className="logo-container" onClick={() => navigateTo("/")}>
                    <div className="logo-icon">
                        <FileText/>
                    </div>
                    <span className="logo-text">ResumeBuilder</span>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<MultiStepForm />} />
            </Routes>
        </>
    );
}

export default App;