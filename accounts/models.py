from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class ClientManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if email is None:
            raise TypeError('User should have a email')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')
        user = self.create_user(email, password)
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        max_length=255, unique=True, blank=True, null=False, default="")

    #ROLE = (("normal-user" , "normal-user"), ("admin", "admin"))

    is_active = models.BooleanField(default=True)
    name = models.CharField(max_length=50, null=True)
    username = models.CharField(max_length=50, null=True, unique=True, blank=False)
    count = models.IntegerField(default=0)
    MBAdmin = models.BooleanField(default=False)
    MBAgent = models.BooleanField(default=False)

    #role = models.CharField(choices=ROLE, default=ROLE[0], max_length=50)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = ClientManager()

    # def has_profile(self):
    #     return hasattr(self, 'participantprofile')

    def _str_(self):
        return self.username