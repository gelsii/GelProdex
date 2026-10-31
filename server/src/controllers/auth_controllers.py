from fastapi import HTTPException, status
from models.auth_models import SignInModels, SignUpModels
from services.auth_services import AuthServices

services = AuthServices()

class AuthControllers:

    @staticmethod
    def sign_up(fields: SignUpModels):

        services.sign_up(fields_req=fields)

        return { "message": "Successfully Sign Up!" }

    @staticmethod
    def sign_in(fields: SignInModels):

        services.sign_in(fields_req=fields)

        return { "message": "Successfully Sign in! You can now access dashboard!" }
