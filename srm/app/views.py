from django.shortcuts import render, redirect
import logging
import json
from django.http import JsonResponse

logger = logging.getLogger(__name__)

from .models import *
from .forms import DomainForm  # Import DomainForm

def dashboard(request):
    return render(request, 'dashboard.html')

def domains(request):
    if request.method == 'POST':
        logger.info("Incoming data: %s", request.body)  # Log incoming data
        data = json.loads(request.body)  # Parse JSON data
        form = DomainForm(data)

        if form.is_valid():
            domain_instance = form.save()  # Save the domain instance
            return JsonResponse({
                'id': domain_instance.id,
                'domain': domain_instance.domain,
                'client': domain_instance.client,
                'registrar': domain_instance.registrar,
                'status': domain_instance.status,
                'expiry_date': domain_instance.expiry,
            })  # Return JSON response
        else:
            logger.error("Form is not valid: %s", form.errors)  # Log form errors
            return JsonResponse({
                'error': 'Invalid form data',
                'form_errors': form.errors
            }, status=400)  # Return JSON response with errors

    else:
        form = DomainForm()
    logger.info("Rendering domains template")  # Debug log for rendering
    domains = Domain.objects.all()  # Fetch existing domains

    return render(request, 'domains.html', {'form': form, 'domains': domains})

def update_domain(request, domain_id):
    if request.method == 'PUT':
        data = json.loads(request.body)  # Parse JSON data
        domain_instance = Domain.objects.get(id=domain_id)  # Get the domain instance
        form = DomainForm(data, instance=domain_instance)  # Bind the form to the instance

        if form.is_valid():
            domain_instance = form.save()  # Save the updated domain instance
            return JsonResponse({
                'id': domain_instance.id,
                'domain': domain_instance.domain,
                'client': domain_instance.client,
                'registrar': domain_instance.registrar,
                'status': domain_instance.status,
                'expiry_date': domain_instance.expiry,
            })  # Return JSON response
        else:
            return JsonResponse({
                'error': 'Invalid form data',
                'form_errors': form.errors
            }, status=400)  # Return JSON response with errors

def delete_domain(request, domain_id):
    if request.method == 'DELETE':
        try:
            domain_instance = Domain.objects.get(id=domain_id)  # Get the domain instance
            domain_instance.delete()  # Delete the domain
            return JsonResponse({'message': 'Domain deleted successfully'}, status=204)  # Return success message
        except Domain.DoesNotExist:
            return JsonResponse({'error': 'Domain not found'}, status=404)  # Return not found error
        except Exception as e:
            logger.error("Error deleting domain: %s", str(e))  # Log the error
            return JsonResponse({'error': 'An error occurred while deleting the domain'}, status=500)  # Return server error


def hosting(request):
    return render(request, 'hosting.html')

def licenses(request):
    return render(request, 'licenses.html')

def ssl(request):
    return render(request, 'ssl.html')

def seo(request):
    return render(request, 'seo.html')
