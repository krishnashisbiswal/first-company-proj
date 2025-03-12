from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Domain)
admin.site.register(License)
admin.site.register(Hosting)
admin.site.register(Seo)
admin.site.register(Ssl)