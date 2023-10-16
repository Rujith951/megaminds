from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from json import loads
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from .models import Products, Trasactions

# Create your views here.


@csrf_exempt
def login(req):
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            user = authenticate(password=body["password"], username=body["email"])
            data = {
                "id": user.id,
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
                "id": user.id,
                "name": user.first_name,
                "email": user.email,
                "password": user.password,
            }
            return JsonResponse({"error": "no", "data": data, "token": token})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})


@csrf_exempt
def get_all_products(req):
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            userid = body["userid"]
            products = Products.objects.filter(vendor_id=userid).values()
            return JsonResponse({"error": "no", "data": list(products)})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})


@csrf_exempt
def get_all_transactions(req):
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            userid = body["userid"]
            products = Products.objects.filter(vendor_id=userid).values()
            transactions = Trasactions.objects.filter(vendor_id=userid).values()
            for t in transactions:
                p = list(filter(lambda x: x["id"] == t["product_id"], products))[0]
                t["product_id"] = {
                    "pname": p["p_name"],
                    "pcategory": p["p_category"],
                    "pid": p["id"],
                }
            return JsonResponse({"error": "no", "data": list(transactions)})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})


"""
    try:
        if req.method == "POST":
            body = loads(req.body.decode("utf-8"))
            
            return JsonResponse({"error": "no", "data": 100})
        else:
            return JsonResponse({"error": "yes", "message": "method not supported"})
    except Exception as ex:
        return JsonResponse({"error": "yes", "message": ex.args[0]})

"""
