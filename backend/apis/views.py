from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from json import loads
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string

# Create your views here.


@csrf_exempt
def login(req):
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            user = authenticate(password=body["password"], username=body["email"])
            data = {
                "name": user.first_name,
                "email": user.email,
                "password": user.password,
            }
            token = get_random_string(length=20)
            if user is not None:
                return JsonResponse({"error": "no", "data": data, "token": token})
            else:
                return JsonResponse({"error": "no", "data": None})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})


@csrf_exempt
def register(req):
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            password = make_password(body["password"])
            user = User(
                email=body["email"],
                first_name=body["name"],
                password=password,
                username=body["email"],
            )
            user.save()
            token = get_random_string(length=20)
            data = {
                "name": user.first_name,
                "email": user.email,
                "password": user.password,
            }
            return JsonResponse({"error": "no", "data": data, "token": token})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})
