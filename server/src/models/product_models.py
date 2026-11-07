from pydantic import BaseModel

class CreateProductModels(BaseModel):
    name: str
    description: str
    price: int | float
    url_image: str
    url_message: str
