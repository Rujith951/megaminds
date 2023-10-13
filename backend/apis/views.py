from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from json import loads
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# Create your views here.


@csrf_exempt
def login(req):
    if req.method == "POST":
        body = loads(req.body.decode("utf-8"))
        user = authenticate(email=body["email"], password=body["password"])
        if user is not None:
            return JsonResponse({"error": "no", "data": {}})
        else:
            return JsonResponse({"error": "no", "data": None})
    else:
        return JsonResponse({"error": "yes", "message": "method not supported"})


@csrf_exempt
def register(req):
    if req.method == "POST":
        body = loads(req.body.decode("utf-8"))
        user = User(
            email=body["email"], first_name=body["name"], password=body["password"]
        )
        user.save()
        data = {"name": user.first_name, "email": user.email, "password": user.password}
        return JsonResponse({"error": "no", "data": data})
    else:
        return JsonResponse({"error": "yes", "message": "method not supported"})
