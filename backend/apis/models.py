from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Products(models.Model):
    category_choices = [
        ("FURNITURE", "FURNITURE"),
        ("ELECTRICALS", "ELECTRICALS"),
        ("SPORTS", "SPORTS"),
    ]
    p_name = models.CharField(max_length=100, null=False, blank=False)
    p_category = models.CharField(
        choices=category_choices, null=False, blank=False, max_length=100
    )
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)


class Trasactions(models.Model):
    t_date = models.DateField(null=False)
    t_amount = models.IntegerField(null=False)
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
