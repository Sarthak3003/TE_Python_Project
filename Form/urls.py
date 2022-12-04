from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
  
# importing views from views..py
from .views import *
  
urlpatterns = [
    path('', MemberAccess.as_view()),
    path('old', OldMemeber.as_view()),
    path('admindashboardfilter', AdminDashboardFilter.as_view()),
    path('agentdashboardfilter', AgentDashboardFilter.as_view()),
    path('new', NewApplication.as_view()),
    path('agentbucket', AgentBucketAccess.as_view()),
    path('updated', Updated.as_view()),
    path('declined', Declined.as_view()),
    path('verified', Verified.as_view()),
    path('paid', Paid.as_view()),
    path('rejected', Rejected.as_view()),
    path('email', EmailOTP.as_view()),
    # path('sms', SMSOTP.as_view()),
    path('payment', PaymentRequest.as_view()),
    path('verify', AdminVerify.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
