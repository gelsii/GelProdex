from controllers.auth_controllers import AuthControllers
from fastapi import APIRouter

auth_router = APIRouter(prefix="/api/auth")

controllers = AuthControllers()

auth_router.post("/signup", status_code=201)(controllers.sign_up)

auth_router.post("/signin")(controllers.sign_in)