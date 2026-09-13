from rest_framework import serializers
import re

# ----------------- PERSONAL SERIALIZER -----------------
class PersonalSerializer(serializers.Serializer):
    fullName = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    summary = serializers.CharField(required=True)

# ----------------- EDUCATION SERIALIZER -----------------
class EducationItemSerializer(serializers.Serializer):
    degree = serializers.CharField(required=True)
    college = serializers.CharField(required=True)
    endDate = serializers.CharField(required=True)
    grade = serializers.CharField(required=True)

class EducationSerializer(serializers.Serializer):
    education = EducationItemSerializer(many=True)

# ----------------- EXPERIENCE SERIALIZER -----------------
class ExperienceItemSerializer(serializers.Serializer):
    jobTitle = serializers.CharField(required=True)
    company = serializers.CharField(required=True)
    location = serializers.CharField(required=True)
    startDate = serializers.CharField(required=True)
    endDate = serializers.CharField(allow_blank=True, required=False)
    isCurrent = serializers.BooleanField(required=False)
    description = serializers.CharField(required=True)

class ExperienceSerializer(serializers.Serializer):
    hasExperience = serializers.CharField(required=True)
    experience = ExperienceItemSerializer(many=True, required=False)

# ----------------- SKILL SERIALIZER -----------------
class SkillItemSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    level = serializers.IntegerField(min_value=0, max_value=5, required=True)

class SkillSerializer(serializers.Serializer):
    skills = SkillItemSerializer(many=True)

# ----------------- OTHERS SERIALIZER -----------------
class OthersSerializer(serializers.Serializer):
    hobbies = serializers.CharField(required=True)
    strengths = serializers.CharField(required=True)
