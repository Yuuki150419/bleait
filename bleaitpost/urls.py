from django.urls import path
from .views import signupview, loginview, logoutview, homeview, update, saveview
from django.contrib.auth.models import User

urlpatterns = [
    path('signup/', signupview, name = "signup"),
    path('login/', loginview, name = "login"),
    path('logout/', logoutview, name = "logout"),
    path('home/<int:ID>/', homeview, name = "home"),
    path('update/<int:ID>/', update, name = "update"),
    path('save/<int:ID>/', saveview, name = "save"),

    #path('create/', CreateClass.as_view(), name = "create"),
    #path('update/<int:pk>/', UpdateClass.as_view(), name = "update"),
    #path('<slug:username_data>/home3/', homeview, name = "home3"),
]