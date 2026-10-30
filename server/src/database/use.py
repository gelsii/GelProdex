import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client = MongoClient(os.getenv("DATABASE_URI"))

database = client.get_database(name="prodex")

users_collection = database.get_collection(name="users")