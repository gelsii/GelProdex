from dependencies.get_current_user import get_user
from fastapi import HTTPException, Depends, status
from services.product_services import ProductServices
from fastapi.security import APIKeyCookie

services = ProductServices()

class ProductControllers:


    @staticmethod
    def get_all_products_user(user = Depends(get_user)):

        products = services.get_user_products(user_id=user["_id"])

        return { "products": products }

    