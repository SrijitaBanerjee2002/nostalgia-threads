from rest_framework import serializers
from .models import Memory
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class MemorySerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Memory
        fields = ['id', 'author', 'region', 'memory', 'tags', 'reactions', 'created_at']

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user