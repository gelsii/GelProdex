import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()

def main() -> None:
    print("running server!")
    uvicorn.run(app="app:app", host=os.getenv("HOST"), port=int(os.getenv("PORT")), reload=True)
