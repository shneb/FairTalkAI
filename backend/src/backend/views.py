from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

class Home(APIView):
    @extend_schema(
        responses={200: None}  # Optionally define the expected response schema.
    )
    def get(self, request):
        return Response({"message": "Hello World!"})
