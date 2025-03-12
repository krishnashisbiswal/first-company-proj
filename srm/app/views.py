from django.shortcuts import render, redirect
from .forms import DomainForm
from .models import Domain
from django.views import View
from django.http import JsonResponse


def dashboard(request):
    return render(request, 'dashboard.html')

class AddDomainView(View):
    def post(self, request):
        form = DomainForm(request.POST)
        print("Submitted data:", request.POST)  # Debugging line to log submitted data

        if form.is_valid():
            form.save()
            print("Form saved successfully.")  # Log successful save
            return JsonResponse({'status': 'success', 'message': 'Domain added successfully.'})
        else:
            print("Form is invalid:", form.errors)  # Log form errors for debugging
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)



    def get(self, request):
        form = DomainForm()  # Initialize the form for GET requests
        return render(request, 'add_domain.html', {'form': form})  # Return to the add domain page



def domains(request):
    domains_list = Domain.objects.all()  # Fetch all domains from the database
    d = list(domains_list)


    return render(request, 'domains.html', {'domains': d})  # Pass the domains to the template

def hosting(request):
    return render(request, 'hosting.html')

def licenses(request):
    return render(request, 'licenses.html')

def ssl(request):
    return render(request, 'ssl.html')

def seo(request):
    return render(request, 'seo.html')
