from django import forms
from .models import Domain, Hosting, License, Seo, Ssl

class DomainForm(forms.ModelForm):
    class Meta:
        model = Domain
        fields = ['domain', 'client', 'registrar', 'status' , 'expiry']

class HostingForm(forms.ModelForm):
    class Meta:
        model = Hosting
        fields = ['package', 'client', 'provider', 'renewal', 'status']

class LicenseForm(forms.ModelForm):
    class Meta:
        model = License
        fields = ['software', 'client', 'license_key', 'expiry', 'status']

class SeoForm(forms.ModelForm):
    class Meta:
        model = Seo
        fields = ['website', 'client', 'package', 'renewal', 'status']

class SslForm(forms.ModelForm):
    class Meta:
        model = Ssl
        fields = ['domain', 'client', 'type', 'expiry', 'status']