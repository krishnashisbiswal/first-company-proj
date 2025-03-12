from django.urls import path
from .views import  *



urlpatterns = [
    path('',dashboard, name='dashboard'),  # URL for the dashboard
    path('add-domain/', AddDomainView.as_view(), name='add_domain'),  # Updated to use class-based view
    path('domains/', domains, name='domains'),  # URL for listing domains
    path('hosting/', hosting, name='hosting'),  # URL for hosting
    path('licenses/', licenses, name='licenses'),  # URL for licenses
    path('ssl/', ssl, name='ssl'),  # URL for SSL
    path('seo/', seo, name='seo'),  # URL for SEO
]
