from . import views
from django.urls import path

urlpatterns = [
    path('', views.send_the_homepage),
    path('signup', views.sign_up),
    path('login', views.log_in),
    path('logout', views.log_out),
    path('whoami', views.who_am_i),
    path('home', views.start_new_game)
]