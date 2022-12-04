from email.errors import MessageError
from email.mime import message
import math
import random
import secrets
import json
import pymongo
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from django.forms.models import model_to_dict
from .models import *
# from accounts.permissions import IsAdmin
from .serializers import *

#email imports
from django.conf import settings
from django.core.mail import send_mail

#whatsapp imports
from twilio.rest import Client

 
# Create your views here.

class MemberAccess(APIView):

    def get(self,request):
        records = Member.objects.all()

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = records.count()
        start = (page - 1) * per_page
        end = page * per_page

        record_serializer = MemberSerializer(records[start:end], many=True)
        return Response(
            {
                "val": True,
                "data": record_serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            }, status=status.HTTP_200_OK)
    
    def post(self,request):
        data = ID.objects.first()

        #Application ID
        app_id = data.applicationIDCurr
        l_app_id = app_id[:4]
        r_app_id = app_id[4:]
        r_app_id = int(r_app_id)
        r_app_id += 1
        r_app_id = str(r_app_id)
        app_id = l_app_id + r_app_id
        a_json = {"app_id": app_id}

        ID.objects.filter(id = 1).update(applicationIDCurr = app_id)

        records_data=JSONParser().parse(request)
        records_data.update(ApplicationID=a_json["app_id"])
        records_serializer= MemberSerializer(data=records_data)
        if records_serializer.is_valid():
            records_serializer.save()
            return Response(
                {
                    "val": "Added Successfully"
                }, status=status.HTTP_200_OK)
        return Response(
            {
                "val": "Failed to Add",
                "error": records_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request):
        data = json.load(request)
        app_id = data["ApplicationID"]
        records= Member.objects.get(ApplicationID = app_id)
        records_serializer=MemberSerializer(records, data=data)
        print(records_serializer)
        if records_serializer.is_valid():
            records_serializer.save()
            return Response(
                {
                    "val": "Updated Successfully"
                }, status=status.HTTP_200_OK)
        return Response(
            {
                "val": "Updation Failed"
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        records_data=JSONParser().parse(request)
        records=Member.objects.get(ApplicationID=records_data['app_id'])
        records.delete()
        return Response(
            {
                "val": "Deleted Successfully"
            }, status=status.HTTP_200_OK)

class OldMemeber(APIView):

    def get(self,request):
        records = Old.objects.all()

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = records.count()
        start = (page - 1) * per_page
        end = page * per_page

        record_serializer = OldSerializer(records[start:end], many=True)
        return Response(
            {
                "val": True,
                "data": record_serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            }, status=status.HTTP_200_OK)

    def post(self,request):

        data = ID.objects.first()
        app_id = data.applicationIDCurr
        l_app_id = app_id[:4]
        r_app_id = app_id[4:]
        r_app_id = int(r_app_id)
        r_app_id += 1
        r_app_id = str(r_app_id)
        app_id = l_app_id + r_app_id
        d_json = {"app_id": app_id}

        ID.objects.filter(id = 1).update(applicationIDCurr = app_id)

        records_data=JSONParser().parse(request)
        records_data.update(app_id=d_json["app_id"])
        records_serializer= OldSerializer(data=records_data)
        if records_serializer.is_valid():
            records_serializer.save()
            return Response(
                {
                    "val": "Added Successfully"
                }, status=status.HTTP_200_OK)
        return Response(
            {
                "val": "Failed to Add",
                "error": records_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class AgentBucketAccess(APIView):

    def get(self,request):
        records = AgentBucket.objects.all()
        # random.shuffle(records)
        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = records.count()
        start = (page - 1) * per_page
        end = page * per_page

        record_serializer = AgentBucketSerializer(records[start:end], many=True)
        return Response(
            {
                "val": True,
                "data": record_serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            }, status=status.HTTP_200_OK)

    def post(self,request):
        records_data=JSONParser().parse(request)
        data = ID.objects.first()
        bucketid = data.bucketID
        bucketid = int(bucketid)
        bucketid += 1

        records_data["recid"] = bucketid
        ID.objects.filter(id = 1).update(bucketID = bucketid)
        records_serializer= AgentBucketSerializer(data=records_data)
        if records_serializer.is_valid():
            records_serializer.save()
            return Response(
                {
                    "val": "Added Successfully"
                }, status=status.HTTP_200_OK)
        return Response(
            {
                "val": "Failed to Add",
                "error": records_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request):
        query = json.load(request)
        stat = query["Reject"]
        reason = query["reason"]

        if stat == False:
            app_id = query["app_id"]
            id = query["id"]
            # records_data=JSONParser().parse(request)
            records= Member.objects.get(ApplicationID = app_id)
            rec_data = AgentBucket.objects.get(recid = id)
            dict_obj = model_to_dict(rec_data)
            dict_obj.pop("id")
            dict_obj["Processed"] = True

            records_serializer = MemberSerializer(records, data=dict_obj)
            if records_serializer.is_valid():
                records_serializer.save()
                return Response(
                    {
                        "val": "Updated Successfully",
                        "data": dict_obj
                    }, status=status.HTTP_200_OK)
            return Response(
                {
                    "val": "Updation Failed",
                    "data": dict_obj
                }, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            id = query["id"]
            rec_data = AgentBucket.objects.get(recid = id)
            subject = "Request Rejected"
            name1 = rec_data.FirstName
            name2 = rec_data.LastName
            email = rec_data.Email
            print(email)
            name = name1 + " " + name2
            message = f'''Hii {name}, Your application has been rejected for the following reason:
{reason}

If you think there is any mistake, contact: 123456'''
            # message = (message,)
            email_fun(subject, email, message)

            return Response(
                {
                    "val": "Rejection Mail Sent",
                }, status=status.HTTP_200_OK)




class AdminDashboardFilter(APIView):

    def post(self, request):
        query = json.load(request)
        results = Member.objects.all()

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page

        fname = query['FirstName']
        mname = query['MiddleName']
        lname = query['LastName']
        area = query['Area']
        city = query['City']
        pincode = query['Pincode']
        mobile = query['Mobile']
        village = query['NativeVillage']
        address = query['Address']

        if fname != None:
            results = results.filter(FirstName__icontains=fname)
        
        if mname != None:
            results = results.filter(MiddleName__icontains=mname)
        
        if lname != None:
            results = results.filter(LastName__icontains=lname)
        
        if area != None:
            results = results.filter(Area__icontains=area)
        
        if city != None:
            results = results.filter(City__icontains=city)
        
        if pincode != None:
            results = results.filter(Pincode__icontains=pincode)
        
        if mobile != None:
            results = results.filter(Mobile__icontains=mobile)
        
        if village != None:
            results = results.filter(NativeVillage__icontains=village)
        
        if address != None:
            results = results.filter(Address__icontains=address)
        
        serializer = MemberSerializer(results[start:end], many=True)
        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)



class AgentDashboardFilter(APIView):

    def post(self, request):
        query = json.load(request)
        results = Member.objects.all()
        print(results)
        results = results.filter(New__in=[False])
        # results = results.filter(Processed__in=[False])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page

        fname = query['FirstName']
        mname = query['MiddleName']
        lname = query['LastName']
        area = query['Area']
        city = query['City']
        pincode = query['Pincode']
        mobile = query['Mobile']
        village = query['NativeVillage']
        address = query['Address']

        if fname != None:
            results = results.filter(FirstName__icontains=fname)
        
        if mname != None:
            results = results.filter(MiddleName__icontains=mname)
        
        if lname != None:
            results = results.filter(LastName__icontains=lname)
        
        if area != None:
            results = results.filter(Area__icontains=area)
        
        if city != None:
            results = results.filter(City__icontains=city)
        
        if pincode != None:
            results = results.filter(Pincode__icontains=pincode)
        
        if mobile != None:
            results = results.filter(Mobile__icontains=mobile)
        
        if village != None:
            results = results.filter(NativeVillage__icontains=village)
        
        if address != None:
            results = results.filter(Address__icontains=address)
        
        serializer = MemberSerializer(results[start:end], many=True)
        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class NewApplication(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(New__in=[True])
        results = results.filter(Verified__in=[False])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class Updated(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(New__in=[False])
        results = results.filter(Processed__in=[True])
        results = results.filter(MDOBool__in=[False])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class Declined(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(Verified__in=[False])
        results = results.filter(Processed__in=[True])
        results = results.filter(MDOBool__in=[True])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class Verified(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(Verified__in=[True])
        results = results.filter(Paid__in=[False])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class Paid(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(Verified__in=[True])
        results = results.filter(Paid__in=[True])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)


class Rejected(APIView):

    def get (self, request):
        results = Member.objects.all()
        results = results.filter(Rejected__in=[True])

        #pagination
        page = int(request.GET.get('page', 1))
        per_page = 50
        total = results.count()
        start = (page - 1) * per_page
        end = page * per_page
        
        serializer = MemberSerializer(results[start:end], many=True)

        return Response(
            {
                "val": True, 
                "data": serializer.data,
                "total": total,
                "page": page,
                "last_page": math.ceil(total/per_page),
            },  status=status.HTTP_200_OK)

def email_fun(subject, to, message):
        subject = subject
        message = message
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [to,]

        send_mail(subject, message, email_from, recipient_list)

        return Response(
            {
                "val": True, 
            },  status=status.HTTP_200_OK)


class EmailOTP (APIView):

    def post(self, request):
        body = json.load(request)
        print(body)
        email = body['email']
        otp = body['otp']
        print(email)

        subject = "Email OTP"
        message = f"your otp for account verfication is {otp}"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email,]
        send_mail(subject, message, email_from, recipient_list)

        return Response(
            {
                "val": True, 
            },  status=status.HTTP_200_OK)


def payment(app_id):

    token = secrets.token_hex(15)
    new_data = {
        "ApplicationID": app_id,
        "Token": token,
    }
    records_serializer= PaymentRequestSerializer(data=new_data)
    if records_serializer.is_valid():
        data = ID.objects.first()

        #Member ID
        mem = Member.objects.get(ApplicationID = app_id)
        mem_dict = model_to_dict(mem)
        mem_id = data.memberIDCurr
        if mem_id == "":
            l_mem_id = mem_id[:4]
            r_mem_id = mem_id[4:]
            r_mem_id = int(r_mem_id)
            r_mem_id += 1
            r_mem_id = str(r_mem_id)
            mem_id = l_mem_id + r_mem_id
            m_json = {"mem_id": mem_id}
            
            ID.objects.filter(id = 1).update(memberIDCurr = mem_id)
            mem_dict["MemberID"] = m_json["mem_id"]
        mem_dict["Verified"] = True
        mem_dict["Paid"] = True
                
        records= Member.objects.get(ApplicationID = app_id)
        records_serializer=MemberSerializer(records, data=mem_dict)

        if records_serializer.is_valid():
            records_serializer.save()
            print("paid")
                
        curr_mem = Member.objects.get(ApplicationID = app_id)
        email = curr_mem.Email
        subject = "Payment Request"
        base = "localhost:3000/payment?token="
        link = base + token
        name = curr_mem.FirstName + curr_mem.LastName
        message = f'''Hii {name}, Your application ID is {app_id}. Glad to have you on board with Matunga Boarding\n
    Amount: Rs 500\n
    Payemnt Link:{link}\n\n
    DO NOT SHARE THIS LINK WITH ANYONE.'''

        email_fun(subject, email, message)

         ## mobile otp code here




        records_serializer.save()

        return Response(
            {
                "val": "Added Successfully"
                }, status=status.HTTP_200_OK)
    return Response(
        {
            "val": "Failed to Add",
            "error": records_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        

class PaymentRequest(APIView):

    def post(self, request):
        data = json.load(request)
        app_id = data["ApplicationID"]
        extracted = PaidToken.objects.filter(ApplicationID = app_id).exists()
        # print(extracted)
        if extracted == True:
            token = secrets.token_hex(15)
            print(token)
            PaidToken.objects.filter(ApplicationID = app_id).update(Token = token)

        else:
            token = secrets.token_hex(15)
            new_data = {
                "ApplicationID": app_id,
                "Token": token,
            }
            records_serializer= PaymentRequestSerializer(data=new_data)

            if records_serializer.is_valid():
                records_serializer.save()
                print("saved")
                data = ID.objects.first()

                #Member ID
                mem= Member.objects.get(ApplicationID = app_id)
                mem_dict = model_to_dict(mem)
                mem_id = data.memberIDCurr
                if mem_id == "":
                    l_mem_id = mem_id[:4]
                    r_mem_id = mem_id[4:]
                    r_mem_id = int(r_mem_id)
                    r_mem_id += 1
                    r_mem_id = str(r_mem_id)
                    mem_id = l_mem_id + r_mem_id
                    m_json = {"mem_id": mem_id}

                    ID.objects.filter(id = 1).update(memberIDCurr = mem_id)
                    mem_dict["MemberID"] = m_json["mem_id"]
                mem_dict["Verified"] = True
                mem_dict["Paid"] = True
                
                records= Member.objects.get(ApplicationID = app_id)
                records_serializer=MemberSerializer(records, data = mem_dict)

                if records_serializer.is_valid():
                    records_serializer.save()
                    print("paid")
            
        curr_mem = Member.objects.get(ApplicationID = app_id)
        email = curr_mem.Email
        subject = "Payment Request"
        base = "localhoast:3000/payment?"
        link = base + token
        name = curr_mem.FirstName + curr_mem.LastName
        message = f'''Hii {name}, Your application ID is {app_id}. Glad to have you on board with Matunga Boarding\n
Amount: Rs 500\n
Payemnt Link: {link}\n\n
DO NOT SHARE THIS LINK WITH ANYONE.'''

        email_fun(subject, email, message)
            
            ## mobile otp code here




        # records_serializer.save()

        return Response(
            {
                "val": "Added Successfully"
            }, status=status.HTTP_200_OK)
        return Response(
            {
                "val": "Failed to Add",
                # "error": records_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        

class AdminVerify(APIView):

    def post(self, request):
        body = json.load(request)
        app_id = body["app_id"]
        reason = body["reason"]

        mem = Member.objects.get(ApplicationID = app_id)
        name = mem.FirstName + mem.LastName

        if body["reject"] == False:
            if mem.Paid == True:
                data = ID.objects.first()

                #Member ID
                mem_id = data.memberIDCurr
                l_mem_id = mem_id[:4]
                r_mem_id = mem_id[4:]
                r_mem_id = int(r_mem_id)
                r_mem_id += 1
                r_mem_id = str(r_mem_id)
                mem_id = l_mem_id + r_mem_id
                m_json = {"mem_id": mem_id}

                ID.objects.filter(id = 1).update(memberIDCurr = mem_id)
                mem= Member.objects.get(ApplicationID = app_id)
                mem_dictt = model_to_dict(mem)
                mem_dictt["Verified"] = True
                mem_dictt["MemberID"] = m_json["mem_id"]

                records= Member.objects.get(ApplicationID = app_id)
                records_serializer=MemberSerializer(records, data=mem_dictt)
                if records_serializer.is_valid():
                    records_serializer.save()
                email = mem.Email
                subject = "Payment"
                message=f'''Hii {name}, Your member ID is {mem_id}. Glad to have you on board with Matunga Boarding''',      
                email_fun(subject, email, message)

                return Response(
                    {
                        "val": "Confirmation Sent Successfully"
                    }, status=status.HTTP_200_OK)
            if mem.Paid == False:
                payment(app_id)
                return Response(
                    {
                        "val": "Sent Successfully"
                    }, status=status.HTTP_200_OK)
        
        else:
            rec_data = Member.objects.get(ApplicationID = app_id)
            subject = "Request Rejected"
            name1 = rec_data.FirstName
            name2 = rec_data.LastName
            email = rec_data.Email
            print(email)
            name = name1 + " " + name2
            message = f'''Hii {name}, Your application has been rejected for the following reason:
{reason}

If you think there is any mistake, contact: 123456'''
            # message = (message,)
            email_fun(subject, email, message)

            return Response(
                {
                    "val": "Rejection Mail Sent",
                }, status=status.HTTP_200_OK)

        

        