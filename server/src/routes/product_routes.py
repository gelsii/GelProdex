from controllers.product_controllers import ProductControllers
from fastapi import APIRouter

product_router = APIRouter(prefix="/api")
controllers = ProductControllers()

product_router.get("/products/user")(controllers.get_all_products_user)

product_router.post("/products")(controllers.create_product)

product_router.get("/products")(controllers.get_all_products)

product_router.put("/products")(controllers.update_product_user)

product_router.delete("/products")(controllers.delete_product_user)