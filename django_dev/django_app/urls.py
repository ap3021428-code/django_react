

from django.urls import path
from .views import employee_list_create, employee_detail,profile

urlpatterns = [
    path("employees/", employee_list_create),
    path("employees/<int:pk>/", employee_detail),
    path('profile/', profile),
]