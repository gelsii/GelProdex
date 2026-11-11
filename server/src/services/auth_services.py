from datetime import datetime, timedelta
import os

import bcrypt
from dotenv import load_dotenv
from fastapi import HTTPException, Response, status, Depends
from models.auth_models import SignInModels, SignUpModels
from database import use as db
from utils.internal_server_message import INTERNAL_SERVER_ERROR_MESSAGE
from utils.token import authenticate_token, generate_token

load_dotenv()

class AuthServices:

    @staticmethod
    def sign_up(fields_req: SignUpModels):

        EXCEPTION_400_BAD_REQ = HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The username or email already registered")

        user_founded = db.users_collection.find_one({ "$and": [
            { "email": fields_req.email },
            { "username": fields_req.username }
        ]})

        if user_founded:
            raise EXCEPTION_400_BAD_REQ

        generated_salt = bcrypt.gensalt(rounds=14)

        hashed_password = bcrypt.hashpw(password=fields_req.password.encode(), salt=generated_salt)

        data_user = {
            "username": fields_req.username,
            "email": fields_req.email,
            "password": hashed_password
        }

        try: 
            db.users_collection.insert_one(data_user)
        except Exception as error:
            raise INTERNAL_SERVER_ERROR_MESSAGE

    @staticmethod
    def sign_in(fields_req: SignInModels, res: Response):

        EXCEPTION_UNAUTORIZED = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong email or password. Please check again.")

        user_founded = db.users_collection.find_one({ "email": fields_req["email"] })

        if user_founded == None:
            raise EXCEPTION_UNAUTORIZED

        is_match_password = bcrypt.checkpw(password=fields_req["password"].encode(), hashed_password=user_founded["password"])

        if not is_match_password:
            raise EXCEPTION_UNAUTORIZED

        expiration_date = datetime.now() + timedelta(days=float(os.getenv("REFRESH_TOKEN_EXPIRE_D")))
        
        payload = {
            "_id": str(user_founded["_id"]),
            "exp": expiration_date
        }

        refresh_token = generate_token(key=os.getenv("REFRESH_TOKEN_KEY"), algorithm=os.getenv("ALGORITHM_TOKENS"), payload=payload)

        res.set_cookie(key="access", value=refresh_token["token"], httponly=True, secure=True, expires=str(expiration_date))


    @staticmethod
    def get_access_token(refresh_token: str):

        founded_token = db.tokens_revoke_collection.find_one({ "token": refresh_token })

        if founded_token != None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You don't have access to this page.")

        decoded_token = authenticate_token(token=refresh_token, key=os.getenv("REFRESH_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM_TOKENS")])

        access_token = generate_token(key=os.getenv("ACCESS_TOKEN_KEY"), algorithm=os.getenv("ALGORITHM_TOKENS"), payload={
            "_id": decoded_token["_id"],
            "exp": datetime.utcnow() + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_M")))
        })

        return access_token

    @staticmethod
    def authenticate_access_token(token: str):
       decoded =  authenticate_token(token=token, key=os.getenv("ACCESS_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM_TOKENS")])

       print(datetime.now())
       print(datetime.now() + timedelta(seconds=1))
       print(decoded)

    @staticmethod
    def logout_user(refresh_token: str):
        decoded_token = authenticate_token(token=refresh_token, key=os.getenv("REFRESH_TOKEN_KEY"), algorithms=[os.getenv("ALGORITHM_TOKENS")])

        data_revoke = {
            "token": refresh_token,
            **decoded_token
        }

        try:
            db.tokens_revoke_collection.insert_one(data_revoke)
        except Exception as error:
            raise INTERNAL_SERVER_ERROR_MESSAGE


        