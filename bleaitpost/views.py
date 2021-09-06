from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from .models import StoreModel
from django.views.generic import CreateView, UpdateView
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
import firebase_admin
from firebase_admin import firestore

# Create your views here.

def signupview(request):
    if request.method == "POST":
        username_data = request.POST["username_data"]
        password_data = request.POST["password_data"]
        try:
            User.objects.create_user(username_data, '', password_data)
            storemodel = StoreModel()
            storemodel.save()
            user = authenticate(request, username = username_data, password = password_data)
            return redirect("home",ID = user.pk)
        except IntegrityError:
             return render(request, "signup.html",{"error":"このユーザーは既に登録されています。"})
    else:
        return render(request, "signup.html")
    return render(request, "signup.html")

def loginview(request):
    if request.method == "POST":
        username_data = request.POST["username_data"]
        password_data = request.POST["password_data"]
        user = authenticate(request, username = username_data, password = password_data)
        if user is not None:
            login(request,user)
            return redirect("home",ID = user.pk)
        else:
            return render(request, "login.html",{"error":"Username または Passwordが間違っています。"})
    return render(request, "login.html")

def logoutview(request):
    logout(request)
    return redirect("login")

@login_required
def homeview(request, ID):
    try:
        store_name_Data    = StoreModel.objects.get(id = ID).store_name
        store_address_Data = StoreModel.objects.get(id = ID).store_address
        business_status_Data = StoreModel.objects.get(id = ID).business_status
        store_comment_Data = StoreModel.objects.get(id = ID).store_comment
        drawingImage_Data = StoreModel.objects.get(id = ID).drawingImage
        context = {
            #"loadIntoJavascript" : True,
            "store_name_Data" : store_name_Data,
            "store_address_Data" : store_address_Data,
            "business_status_Data" : business_status_Data,
            "store_comment_Data" : store_comment_Data,
            "drawingImage_Data" : drawingImage_Data,
            "ID_Data": ID
        }
        response = render(request, 'home.html', context)
        return response

    except StoreModel.DoesNotExist:
        response = render(request, 'home.html')
        return response

@login_required
def update(request, ID):
    try:
        store_name_Data    = StoreModel.objects.get(id = ID).store_name
        store_address_Data = StoreModel.objects.get(id = ID).store_address
        business_status_Data = StoreModel.objects.get(id = ID).business_status
        store_comment_Data = StoreModel.objects.get(id = ID).store_comment
        drawingImage_Data = StoreModel.objects.get(id = ID).drawingImage
        context = {
            "loadIntoJavascript" : True,
            "store_name_Data" : store_name_Data,
            "store_address_Data" : store_address_Data,
            "business_status_Data" : business_status_Data,
            "store_comment_Data" : store_comment_Data,
            "drawingImage_Data" : drawingImage_Data,
            "ID_Data": ID
        }
        response = modifiedResponseHeaders(render(request, 'update.html', context))
        return response

    except StoreModel.DoesNotExist:
        response = modifiedResponseHeaders(render(request, 'update.html', context))
        return response

@login_required
def saveview(request,ID):
    if request.method == "POST":
        storemodel = StoreModel.objects.get(id = ID)
        storemodel.store_name = request.POST['store_name_Data']
        storemodel.store_address = request.POST['store_address_Data']
        storemodel.business_status = request.POST['business_status_Data']
        storemodel.store_comment = request.POST['store_comment_Data']
        storemodel.drawingImage = request.POST['drawingImage_Data']
        storemodel.save()
        """"
        firebase_admin.initialize_app()
        db = firestore.client()
        doc_ref = db.collection(u'StoreData').document(u'StoreData')
        doc_ref.set({
            u'StoreName': storemodel.store_name,
            u'StoreAddress': storemodel.store_address,
            u'BusinessStatus': storemodel.business_status,
            u'StoreComment': storemodel.store_comment,
            u'ImageUrl': storemodel.drawingImage,
        })

        users_ref = db.collection(u'StoreData')
        docs = users_ref.get()

        for doc in docs:
            print(u'{} => {}'.format(doc.id, doc.to_dict()))
        """
    try:
        store_name_Data     = StoreModel.objects.get(id = ID).store_name
        store_address_Data  = StoreModel.objects.get(id = ID).store_address
        business_status_Data= StoreModel.objects.get(id = ID).business_status
        store_comment_Data  = StoreModel.objects.get(id = ID).store_comment
        drawingImage_Data   = StoreModel.objects.get(id = ID).drawingImage
        context = {
            "loadIntoJavascript" : True,
            "store_name_Data" : store_name_Data,
            "store_address_Data" : store_address_Data,
            "business_status_Data" : business_status_Data,
            "store_comment_Data" : store_comment_Data,
            "drawingImage_Data" : drawingImage_Data,
            "ID_Data": ID
        }
        response = render(request, 'home.html', context)
        return response

    except StoreModel.DoesNotExist:
        response = render(request, 'home.html')
        return response

def modifiedResponseHeaders(response):
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response

class CreateClass(CreateView):
    template_name = "create.html"
    model = StoreModel
    fields =("store_name","store_address","images","business_status","store_comment")
    success_url = reverse_lazy('home')

class UpdateClass(UpdateView):
    template_name = "update.html"
    model = StoreModel
    fields =("store_name","store_address","images","business_status","store_comment")
    success_url = reverse_lazy('home')