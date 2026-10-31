from pydantic import BaseModel


class SignUpModels(BaseModel):
    username: str
    email: str
    password: str

class SignInModels(BaseModel):
    email: str
    password: str