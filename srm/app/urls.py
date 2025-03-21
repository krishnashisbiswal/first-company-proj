from django.urls import path
from .views import *


urlpatterns = [  
    path('add_domain/', domains , name='add_domain'),
    path('', dashboard, name='dashboard'),  # URL for the dashboard
    path('domains/', domains, name='domains'),  # URL for listing domains
    path('update_domain/<int:domain_id>/', update_domain, name='update_domain'),  # URL for updating domains
    path('delete_domain/<int:domain_id>/', delete_domain, name='delete_domain'),  # URL for deleting domains
    path('hosting/', hosting, name='hosting'),  # URL for hosting
    path('licenses/', licenses, name='licenses'),  # URL for licenses
    path('ssl/', ssl, name='ssl'),  # URL for SSL
    path('seo/', seo, name='seo'),  # URL for SEO
]
