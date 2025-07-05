from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    path('', views.Tareas.as_view()),
    path('<int:pk>/', views.TareaTareaDetail.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # implementing JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # implementing JWT
]
