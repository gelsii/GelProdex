from controllers.product_controllers import ProductControllers
from fastapi import APIRouter

product_router = APIRouter(prefix="/api")
controllers = ProductControllers()

product_router.get("/products/user")(controllers.get_all_products_user)

product_router.post("/products")(controllers.create_product)