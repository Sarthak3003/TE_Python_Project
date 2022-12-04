from django.db import models
from djongo.models import JSONField

from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
from accounts.models import Client

gender_choices = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)

martial_choices = (
    ('Single', 'Single'),
    ('Married', 'Married'),
    ('Widown', 'Widown'),
    ('Divorced ', 'Divorced'),
)


class ID(models.Model):
    memberIDCurr = models.CharField(max_length=25, default=0)
    applicationIDCurr = models.CharField(max_length=25, default=0)
    bucketID= models.CharField(max_length=20, default=0)

class Member(models.Model):
    MemberID = models.CharField(max_length=25, null=True)
    ApplicationID = models.CharField(max_length=25, default="", null=False)

    AadharNumber = models.CharField(max_length=12, default="", blank=True)
    FirstName = models.CharField(max_length=25, default="", blank=True)
    MiddleName = models.CharField(max_length=25, default="", blank=True)
    LastName = models.CharField(max_length=25, default="", blank=True)
    DateOfBirth = models.CharField(max_length=25, default="", blank=True)
    GrandFatherName = models.CharField(max_length=50, default="", blank=True)
    Gender = models.CharField(max_length=25, choices=gender_choices, default='Male', blank=True)
    MaritalStatus = models.CharField(max_length=25, choices=martial_choices, default='Single', blank=True)
    BloodGroups = models.CharField(max_length=25, default="", blank=True)
    FamilyDetails = models.JSONField(null=True, default=dict, blank=True)
    EducationQualification = models.CharField(max_length=50, default="", blank=True)
    Occupation = models.CharField(max_length=50, default="", blank=True)
    Address = models.CharField(max_length=200, default="", blank=True)
    Area = models.CharField(max_length=50, default="", blank=True)
    City = models.CharField(max_length=25, default="", blank=True)
    State = models.CharField(max_length=25, default="", blank=True)
    Pincode = models.CharField(max_length=10, default="", blank=True)
    Country = models.CharField(max_length=20, default="", blank=True)
    Phone = models.CharField(max_length=20, default="", blank=True)
    Mobile = models.CharField(max_length=20, default="", blank=True)
    Email = models.CharField(max_length=50, default="", blank=True)
    # NativeTaluka = models.CharField(max_length=100, default="", blank=True)
    NativeVillage = models.CharField(max_length=100, default="", blank=True)

    #new
    References = models.JSONField(null=True, default=dict, blank=True)

    #MDO
    '''
    {
        "married": {"bool": False, "info": ""}, 
        "deceased": {"bool": False, "info": ""}, 
        "other":{"bool": False, "info": ""}
    }
    '''
    MDO = models.JSONField(null=True, default=dict, blank=True)
    ExStudent = models.JSONField(null=True, default=dict, blank=True)
    RejectReason = models.CharField(max_length=500, default="", blank=True)

    #verification s3
    AadharS3 = models.CharField(max_length=300, default="", blank=True)
    PhotoS3 = models.CharField(max_length=300, default="", blank=True)

    #booleans
    Processed = models.BooleanField(default=False, blank=True)
    Verified = models.BooleanField(default=False, blank=True)
    Paid = models.BooleanField(default=False, blank=True)
    New = models.BooleanField(default=False, blank=True)
    Self = models.BooleanField(default=False, blank=True)
    MDOBool = models.BooleanField(default=False, blank=True)
    Rejected = models.BooleanField(default=False, blank=True)

    #agent info
    UpdatedBy = models.CharField(max_length=30, default="", blank=True) #id of the agent updating
    VerifiedBy = models.CharField(max_length=30, default="", blank=True) #id of the admin verifying


class Old(models.Model):
    '''
        will contain the old 5 fields + a field called Application ID
        make a serializer for the same and push data to the new collection after migration
    '''

    app_id = models.CharField(max_length=25, default="")
    rec_id = models.IntegerField(default="", blank=True)
    LastName = models.CharField(max_length=25, default="", blank=True)
    FirstName = models.CharField(max_length=25, default="", blank=True)
    MiddleName = models.CharField(max_length=25, default="", blank=True)
    Village = models.CharField(max_length=50, default="", blank=True)
    Address = models.CharField(max_length=300, default="", blank=True)
    Area = models.CharField(max_length=25, default="", blank=True)

class AgentBucket(models.Model):

    recid = models.CharField(max_length=20, default="")
    AadharNumber = models.CharField(max_length=12, default="")
    FirstName = models.CharField(max_length=25, default="")
    MiddleName = models.CharField(max_length=25, default="")
    LastName = models.CharField(max_length=25, default="")
    DateOfBirth = models.CharField(max_length=25, default="")
    GrandFatherName = models.CharField(max_length=50, default="")
    Gender = models.CharField(max_length=25, choices=gender_choices, default='Male')
    MaritalStatus = models.CharField(max_length=25, choices=martial_choices, default='Single')
    BloodGroups = models.CharField(max_length=25, default="")
    FamilyDetails = models.JSONField(null=True, default=dict)
    EducationQualification = models.CharField(max_length=50, default="")
    Occupation = models.CharField(max_length=50, default="")
    Address = models.CharField(max_length=50, default="")
    Area = models.CharField(max_length=50, default="")
    City = models.CharField(max_length=25, default="")
    State = models.CharField(max_length=25, default="")
    Pincode = models.CharField(max_length=10, default="")
    Country = models.CharField(max_length=20, default="")
    Phone = models.CharField(max_length=20, default="")
    Mobile = models.CharField(max_length=20, default="")
    Email = models.CharField(max_length=50, default="")
    NativeTaluka = models.CharField(max_length=25, default="")
    NativeVillage = models.CharField(max_length=25, default="")

    References = models.JSONField(null=True, default=dict)

    MDO = models.JSONField(null=True, default=dict)
    ExStudent =models.JSONField(null=True, default=dict, blank=True)

    AadharS3 = models.CharField(max_length=300, default="")
    PhotoS3 = models.CharField(max_length=300, default="")

class PaidToken(models.Model):
    ApplicationID = models.CharField(max_length=25, default="")
    Token = models.CharField(max_length=50, default="")