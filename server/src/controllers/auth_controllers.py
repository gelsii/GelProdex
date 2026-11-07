import os

from dependencies.get_current_user import get_user
from fastapi import Depends, Response
from models.auth_models import SignUpModels
from services.auth_services import AuthServices
from fastapi.security import HTTPBasic, HTTPBasicCredentials, APIKeyCookie, HTTPBearer, HTTPAuthorizationCredentials
from utils.token import authenticate_token

services = AuthServices()
sign_in_security = HTTPBasic()
cookie_security = APIKeyCookie(name="access", auto_error=False)
bearer_security = HTTPBearer()

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

    @staticmethod
    def authenticate_access_token(access_token: HTTPAuthorizationCredentials = Depends(bearer_security)):

        services.authenticate_access_token(token=access_token.credentials)

        return { "message": "Welcome to dashboard!" }

    @staticmethod
    def authenticate_auth_page(token: str = Depends(cookie_security)):

        try:
            authenticate_token(token=token, key=os.getenv("REFRESH_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM_TOKENS")])
        except Exception: 
            return { "isLogged": False }
        
        return { "isLogged": True }

    @staticmethod
    def logout_user(res: Response, token: str = Depends(cookie_security)):

        services.logout_user(access_token=token)

        res.delete_cookie(key="access", httponly=True, secure=True)

        return { "message": "Successfully Logouted!" }
