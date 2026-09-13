from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re

# ----------------- PERSONAL VALIDATION -----------------
class PersonalValidationView(APIView):
    def post(self, request):
        data = request.data

        if not data.get("fullName"):
            return Response({"error": "❌ Full Name is Empty"}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get("email"):
            return Response({"error": "❌ Email is Empty"}, status=status.HTTP_400_BAD_REQUEST)
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data["email"]):
            return Response({"error": "❌ Enter a Valid Email Address"}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get("phone"):
            return Response({"error": "❌ Phone Number is Empty"}, status=status.HTTP_400_BAD_REQUEST)
        if not re.match(r"^(?:\+91)?\d{10}$", data["phone"]):
            return Response({"error": "❌ Invalid Indian Phone Number Format"}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get("address"):
            return Response({"error": "❌ Address Is Empty"}, status=status.HTTP_400_BAD_REQUEST)
        if not data.get("summary"):
            return Response({"error": "❌ Summary is Empty"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "OK"}, status=status.HTTP_200_OK)

# ----------------- EDUCATION VALIDATION -----------------
class EducationValidationView(APIView):
    def post(self, request):
        educations = request.data.get("education", [])
        if not educations:
            return Response({"error": "Education data missing"}, status=status.HTTP_400_BAD_REQUEST)

        for i, edu in enumerate(educations):
            suffix = "st" if i == 0 else "nd" if i == 1 else "rd" if i == 2 else "th"
            if not edu.get("degree"):
                return Response({"error": f"❌ The {i+1}{suffix} Field of Degree is Empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not edu.get("college"):
                return Response({"error": f"❌ The {i+1}{suffix} Field of College Name is Empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not edu.get("endDate"):
                return Response({"error": f"❌ The {i+1}{suffix} Field of End Date is Empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not edu.get("grade"):
                return Response({"error": f"❌ The {i+1}{suffix} Field of Grade is Empty"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "OK"}, status=status.HTTP_200_OK)

# ----------------- EXPERIENCE VALIDATION -----------------
class ExperienceValidationView(APIView):
    def post(self, request):
        has_experience = request.data.get("hasExperience")
        experiences = request.data.get("experience", [])

        if has_experience == "No":
            return Response({"message": "OK"}, status=status.HTTP_200_OK)

        if not experiences:
            return Response({"error": "Experience data missing"}, status=status.HTTP_400_BAD_REQUEST)

        suffix = lambda i: "st" if i == 0 else "nd" if i == 1 else "rd" if i == 2 else "th"
        count = 0

        for i, exp in enumerate(experiences):
            idx = f"{i+1}{suffix(i)}"

            if not exp.get("jobTitle"):
                return Response({"error": f"The {idx} field of Job Title is empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not exp.get("company"):
                return Response({"error": f"The {idx} field of Company Name is empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not exp.get("startDate"):
                return Response({"error": f"The {idx} field of Start Date is empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not (exp.get("endDate") or exp.get("isCurrent")):
                return Response({"error": f"The {idx} field of End Date is empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not exp.get("location"):
                return Response({"error": f"The {idx} field of Location is empty"}, status=status.HTTP_400_BAD_REQUEST)
            if not exp.get("description"):
                return Response({"error": f"The {idx} field of Description is empty"}, status=status.HTTP_400_BAD_REQUEST)


        return Response({"message": "OK"}, status=status.HTTP_200_OK)

# ----------------- SKILL VALIDATION -----------------
class SkillValidationView(APIView):
    def post(self, request):
        skills = request.data.get("skills", [])
        if not skills:
            return Response({"error": "❌ No Skills Found"}, status=status.HTTP_400_BAD_REQUEST)

        for i, skill in enumerate(skills):
            suffix = "st" if i == 0 else "nd" if i == 1 else "rd" if i==2 else "th"
            if not skill.get("name"):
                return Response({"error": f"❌ The {i+1}{suffix} Skill Name is Empty"}, status=status.HTTP_400_BAD_REQUEST)

            level = skill.get("level")
            if level is None or not (0 <= level <= 5):
                skill_name = skill.get("name", f"{i+1}{suffix} Skill")
                return Response(
                    {"error": f"❌ Invalid Level for {skill_name} (must be between 0–5)"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response({"message": "OK"}, status=status.HTTP_200_OK)

# ----------------- OTHERS VALIDATION -----------------
class OthersValidationView(APIView):
    def post(self, request):
        others = request.data.get("others", {})
        if not others.get("hobbies"):
            return Response({"error": "❌ Hobbies are Empty"}, status=status.HTTP_400_BAD_REQUEST)
        if not others.get("strengths"):
            return Response({"error": "❌ Strengths are Empty"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "OK"}, status=status.HTTP_200_OK)
