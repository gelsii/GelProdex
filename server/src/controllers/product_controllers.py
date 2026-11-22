from dependencies.get_current_user import get_user
from fastapi import HTTPException, Depends, status
from models.product_models import CreateProductModels
from services.product_services import ProductServices
from fastapi.security import APIKeyCookie

services = ProductServices()

class ProductControllers:

    @staticmethod
    def get_all_products_user(user = Depends(get_user)):

        products = services.get_user_products(user_id=user["_id"])

        return { "products": products }

    @staticmethod
    def create_product(fields: CreateProductModels ,user = Depends(get_user)):

        services.create_product(fields=fields, user=user)

        return { "message": "Successfully created!" }

    @staticmethod
    def get_all_products(limit: int):

        products = services.get_all_products(limit=limit)

        return { "products": products }

    @staticmethod
    def update_product_user(fields: CreateProductModels, id: str, user: dict = Depends(get_user)):

        services.update_product_user(fields_updated=fields, user=user, product_id=id)

        return { "message": "Successfully Updated!" }

    @staticmethod
    def delete_product_user(id: str, user: dict = Depends(get_user)):

        services.delete_product_user(product_id=id, user=user)

        return { "message": "Successfully Deleted!" }

    @staticmethod
    def search_product_user(search: str, user: dict = Depends(get_user)):

        result_products = services.search_product_user(search_query=search, user=user)

        return { "products": result_products }

    @staticmethod
    def search_product(search_name: str):
        
        result = services.search_product(search_query=search_name)

        return { "products": result }

    