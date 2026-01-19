# from django.shortcuts import render

# # Create your views here.
# from rest_framework.response import Response
# from rest_framework.decorators import api_view

# @api_view(['GET'])
# def get_data(request):
#     data = {"message": "Hello from Django!", "user": "Abhishek"}
#     return Response(data)


from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
import logging
logger = logging.getLogger("app")



@api_view(['GET'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated])
def profile(request):
    # print("AUTH HEADER:", request.headers.get("Authorization"))
    return Response({
        "username": request.user.username
    })


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer

@api_view(['GET', 'POST'])
def employee_list_create(request):
    if request.method == 'GET':
        logger.info("GET employee api called")
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        logger.info("POST employee api called")
        # raise ValueError("Testing global exception handler")
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"employee created: id={serializer.data['id']},email={serializer.data['email']})")
            return Response(serializer.data, status=201)
        
    
        logger.warning(f"employee creation failed: errors={serializer.errors}")
        raise ValidationError(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == 'GET':
        logger.info("GET employee api called to fetch employee")
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    if request.method == 'PUT':
        logger.info("PUT employee api called")
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"employee updated successfully")
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        logger.info("DELETE employee api called")
        employee.delete()
        logger.info(f"employee deleted successfully")
        return Response(status=204)
