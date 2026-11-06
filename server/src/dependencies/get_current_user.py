import os

from database.use import users_collection
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyCookie, HTTPBearer, HTTPAuthorizationCredentials
from utils.token import authenticate_token
from bson.objectid import ObjectId

load_dotenv()

bearer_security = HTTPBearer(auto_error=False)

def get_user(token: HTTPAuthorizationCredentials = Depends(bearer_security)):

    decoded_token = authenticate_token(key=os.getenv("ACCESS_TOKEN_KEY"), token=token.credentials, algorithms=os.getenv("ALGORITHM_TOKENS"))

    user_founded = users_collection.find({ "_id": ObjectId(decoded_token["_id"]) }, { "password": 0 })

    if user_founded == None:
        HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You don't have access to this page.")

    for user_data in user_founded:
        user_data["_id"] = str(user_data["_id"])

        user = user_data

    return user
