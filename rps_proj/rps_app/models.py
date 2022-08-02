from random import choices
from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_instructor = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.


class Poll(models.Model):
    question_text = models.TextField()


class Choice(models.Model):
    choice_text = models.CharField(max_length=255)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)


class Vote(models.Model):
    user = models.ForeignKey(AppUser, verbose_name="user", on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
