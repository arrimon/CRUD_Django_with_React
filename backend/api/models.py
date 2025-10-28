from django.db import models

class Person(models.Model):
    EDUCATION_CHOICES = [
        ('SSC', 'SSC'),
        ('HSC', 'HSC/Diploma'),
        ('HONS', 'Honors/BSc'),
        ('MS', 'Masters/MSc'),
    ]

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Others', 'Others'),
    ]

    ADDRESS_CHOICES = [
        ('Dhaka', 'Dhaka'),
        ('Chittagong', 'Chittagong'),
        ('Barisal', 'Barisal'),
        ('Rajshahi', 'Rajshahi'),
        ('Khulna','Khulna'),
        ('Rangpur','Rangpur'), 
        ('Sylhet', 'Sylhet'), 
        ('Mymansing', 'Mymansing'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    education = models.CharField(max_length=200, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    address = models.CharField(max_length=50, choices=ADDRESS_CHOICES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def education_list(self):
        if not self.education:
            return []
        return self.education.split(',')

    def __str__(self):
        return self.name
