from django.urls import path
from .views import *

urlpatterns = [
    path("validate/personal/", PersonalValidationView.as_view(), name="validate_personal"),
    path("validate/education/", EducationValidationView.as_view(), name="validate_education"),
    path("validate/experience/", ExperienceValidationView.as_view(), name="validate_experience"),
    path("validate/skills/", SkillValidationView.as_view(), name="validate_skills"),
    path("validate/others/", OthersValidationView.as_view(), name="validate_others"),
]
