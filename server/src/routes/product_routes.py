from controllers.product_controllers import ProductControllers
from fastapi import APIRouter

product_router = APIRouter(prefix="/api/products")
controllers = ProductControllers()

product_router.get("/user")(controllers.get_all_products_user)