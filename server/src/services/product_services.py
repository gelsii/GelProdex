from datetime import datetime

from fastapi import HTTPException, status
from database.use import users_collection, products_collection
from bson.objectid import ObjectId
from models.product_models import CreateProductModels
from utils.internal_server_message import INTERNAL_SERVER_ERROR_MESSAGE

class ProductServices:

    @staticmethod
    def get_all_products():
        try:
            founded_all_products = products_collection.find({ }, { "_id": 0, "user_id": 0 })
        except Exception as error:
            raise INTERNAL_SERVER_ERROR_MESSAGE

        return list(founded_all_products)

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

    @staticmethod
    def update_product_user(fields_updated: CreateProductModels, user: dict, product_id: str):
        data_updated = {
            "name": fields_updated.name,
            "description": fields_updated.description,
            "price": int(fields_updated.price),
            "url_image": fields_updated.url_image,
            "url_message": fields_updated.url_message
        }

        try:
            products_collection.update_one({ "$and": [
                { "_id": ObjectId(product_id) },
                { "user_id": ObjectId(user["_id"]) }
            ]}, {
                "$set": data_updated
            })
        except Exception as error:
            raise INTERNAL_SERVER_ERROR_MESSAGE

    @staticmethod
    def delete_product_user(product_id: str, user: dict):
        try:
            products_collection.delete_one({ "$and": [
                { "_id": ObjectId(product_id) },
                { "user_id": ObjectId(user["_id"]) }
            ]})
        except Exception as error:
            raise INTERNAL_SERVER_ERROR_MESSAGE
        
        
