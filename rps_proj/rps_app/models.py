from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import *            # import built-in Django Validators
from django.core.exceptions import ValidationError # import ValidationError from Django
from django.utils.translation import gettext_lazy as text # import gettext_lazy


def validate_throw(user_input):
    valid_throws = ["rock", "paper", "scissors"]
    if user_input not in valid_throws:
        raise ValidationError(text(f"{user_input} is not a valid throw. It should be rock, paper, or scissors"))


class Throw(models.Model):
    throw = models.CharField(max_length=8, validators=[validate_throw])

class Game(models.Model):
    victory_num = models.IntegerField(validators=[MinValueValidator(2)], default=2)
    total_throws = models.IntegerField(validators=[MinValueValidator(3)], default=3)

class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    games = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='player', blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [games] # email & Password are required by default.


