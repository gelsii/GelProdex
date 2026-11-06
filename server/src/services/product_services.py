from fastapi import HTTPException, status
from database.use import users_collection, products_collection
from bson.objectid import ObjectId

class ProductServices:


    @staticmethod
    def get_user_products(user_id: str):

        products_user = products_collection.find({ "user_id": ObjectId(user_id) })

        final_products_data = [ ]

        for product in products_user:
            product["_id"] = str(product["_id"])
            product["user_id"] = str(product["user_id"])
            final_products_data.append(product)

        

        return final_products_data
