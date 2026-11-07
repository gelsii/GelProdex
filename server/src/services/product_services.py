from datetime import datetime

from fastapi import HTTPException, status
from database.use import users_collection, products_collection
from bson.objectid import ObjectId
from models.product_models import CreateProductModels
from utils.internal_server_message import INTERNAL_SERVER_ERROR_MESSAGE

class ProductServices:

    @staticmethod
    def get_user_products(user_id: str):

        products_user = products_collection.find({ "user_id": ObjectId(user_id) }).sort({ "createdAt": -1 })

        final_products_data = [ ]

        for product in products_user:
            product["_id"] = str(product["_id"])
            product["user_id"] = str(product["user_id"])
            final_products_data.append(product)

        return final_products_data

    @staticmethod
    def create_product(fields: CreateProductModels, user: dict):

        data_product = {
            "user_id": ObjectId(user["_id"]),
            "username": user["username"],
            "name": fields.name,
            "description": fields.description,
            "price": fields.price,
            "url_image": fields.url_image,
            "url_message": fields.url_message,
            "createdAt": datetime.now()
        }

        try:
            products_collection.insert_one(data_product)
        except:
            raise INTERNAL_SERVER_ERROR_MESSAGE
