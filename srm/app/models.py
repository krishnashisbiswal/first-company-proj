from django.db import models

class Domain(models.Model):
    domain = models.CharField(max_length=50)
    client = models.CharField(max_length=50)
    registrar = models.CharField(max_length=50)
    expiry = models.DateField()
    status = models.CharField(max_length=50)  # Added status field

    def __str__(self):
        return self.domain

class Hosting(models.Model):
    package = models.CharField(max_length=50)
    client = models.CharField(max_length=50)
    provider = models.CharField(max_length=50)
    renewal = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.package

class License(models.Model):    
    software = models.CharField(max_length=50)
    client = models.CharField(max_length=50)
    license_key = models.CharField(max_length=16)
    expiry = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.software

class Seo(models.Model):
    website = models.CharField(max_length=50)
    client = models.CharField(max_length=50)
    package = models.CharField(max_length=50)
    renewal = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.website

class Ssl(models.Model):
    domain = models.CharField(max_length=50)
    client = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    expiry = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.domain
