from django.db import models
# from django.contrib.auth.models 

# Create your models here.

BUSINESS_STATUS_CHOICES = [("営業中","営業中"),("準備中","準備中"),("休業中","休業中")]
class StoreModel(models.Model):
    store_name = models.CharField(max_length=100, blank=True, null = True)
    store_address = models.CharField(max_length=100, blank=True, null = True)
    business_status = models.CharField(max_length=5, choices = BUSINESS_STATUS_CHOICES, blank=True, null = True)
    store_comment = models.TextField(blank=True, null = True)
    drawingImage  = models.TextField(blank=True, null = True)
    drawingStoreX = models.TextField(blank=True, null = True)
    drawingStoreY = models.TextField(blank=True, null = True)