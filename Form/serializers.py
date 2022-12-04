from dataclasses import fields
from attr import field
from rest_framework import serializers
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class IDSerializer(serializers.ModelSerializer):
  class Meta:
    model = ID
    field = ("memberIDCurr", "applicationIDCurr")

class MemberSerializer(serializers.ModelSerializer):
  class Meta:
      model = Member
      fields = ("MemberID", "ApplicationID", "AadharNumber", "FirstName", "MiddleName",
      "LastName", "DateOfBirth", "GrandFatherName", "Gender", "MaritalStatus", "BloodGroups",
      "FamilyDetails", "EducationQualification", "Occupation", "Address", "Area", "City", "State",
      "Pincode", "Phone", "Mobile", "Email", "References", "NativeVillage",
      "MDO", "AadharS3", "PhotoS3", "Processed", "Verified", "Paid", "New", "Self", "MDOBool",
      "UpdatedBy", "VerifiedBy", "ExStudent", "RejectReason", "Rejected")

class OldSerializer(serializers.ModelSerializer):
  class Meta:
    model = Old
    fields = ("app_id", "rec_id", "LastName", "FirstName", "MiddleName", "Village", "Address", "Area")

class AgentBucketSerializer(serializers.ModelSerializer):
  class Meta:
      model = AgentBucket
      fields = ("recid", "AadharNumber", "FirstName", "MiddleName",
      "LastName", "DateOfBirth", "GrandFatherName", "Gender", "MaritalStatus", "BloodGroups",
      "FamilyDetails", "EducationQualification", "Occupation", "Address", "Area", "City", "State",
      "Pincode", "Phone", "Mobile", "Email", "NativeTaluka", "References", "NativeVillage",
      "MDO", "AadharS3", "PhotoS3")


class PaymentRequestSerializer(serializers.ModelSerializer):
  class Meta:
    model = PaidToken
    fields = ("ApplicationID", "Token", )