import os

from database.use import users_collection
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyCookie
from utils.token import authenticate_token
from bson.objectid import ObjectId

load_dotenv()

cookie_token = APIKeyCookie(name="access")

def get_user(token: str = Depends(cookie_token)):

    decoded_token = authenticate_token(key=os.getenv("ACCESS_TOKEN_KEY"), token=token, algorithms=os.getenv("ALGORITHM_TOKENS"))

    user_founded = users_collection.find({ "_id": ObjectId(decoded_token["_id"]) }, { "password": 0 })

    for user_data in user_founded:
        user_data["_id"] = str(user_data["_id"])

        user = user_data

    return user
