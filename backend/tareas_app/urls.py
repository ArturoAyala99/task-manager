from django.urls import path
from . import views

urlpatterns = [

    path('', views.Tareas.as_view()),
    path('<int:pk>/', views.TareaTareaDetail.as_view()),
]
