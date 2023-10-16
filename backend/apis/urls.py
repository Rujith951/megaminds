from django.urls import path
from .views import *

urlpatterns = [
    path("login/", login),
    path("register/", register),
    path("get-all-products/", get_all_products),
    path("get-all-transactions/", get_all_transactions),
]
