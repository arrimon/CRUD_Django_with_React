from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    education = serializers.ListField(child=serializers.CharField(), allow_empty=True)

    class Meta:
        model = Person
        fields = ['id', 'name', 'phone', 'email', 'education', 'gender', 'address', 'created_at']
        read_only_fields = ['id', 'created_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['education'] = instance.education_list()
        return ret

    def create(self, validated_data):
        edu = validated_data.pop('education', [])
        validated_data['education'] = ','.join(edu)
        return Person.objects.create(**validated_data)

    def update(self, instance, validated_data):
        edu = validated_data.pop('education', None)
        if edu is not None:
            instance.education = ','.join(edu)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()
        return instance
