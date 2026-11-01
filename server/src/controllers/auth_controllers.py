from fastapi import Depends, Response
from models.auth_models import SignUpModels
from services.auth_services import AuthServices
from fastapi.security import HTTPBasic, HTTPBasicCredentials, APIKeyCookie

services = AuthServices()
sign_in_security = HTTPBasic()
cookie_security = APIKeyCookie(name="refresh_token")

class AuthControllers:

    @staticmethod
    def sign_up(fields: SignUpModels):

        services.sign_up(fields_req=fields)

        return { "message": "Successfully Sign Up!" }

    @staticmethod
    def sign_in(response: Response, credentials: HTTPBasicCredentials = Depends(sign_in_security)):

        fields = {
            "email": credentials.username,
            "password": credentials.password
        } 

        services.sign_in(fields_req=fields, res=response)

        return { "message": "Successfully Sign in! You can now access dashboard!" }

    @staticmethod
    def get_access_token(refresh_token: str = Depends(cookie_security)):

        access_token = services.get_access_token(refresh_token=refresh_token)

        return { "access_token": access_token["token"] }
