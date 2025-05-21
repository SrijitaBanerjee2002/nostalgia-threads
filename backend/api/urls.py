from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup', views.SignupView.as_view(), name='api-signup'),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('memories', views.MemoryListView.as_view(), name='memory-list'),
    path('memories/create', views.MemoryCreateView.as_view(), name='memory-create'),  
    path('memories/<int:memory_id>/react', views.MemoryReactView.as_view(), name='memory-react'),
    path('memories/delete/<int:memory_id>', views.MemoryDeleteView.as_view(), name='memory-delete'),   
]
