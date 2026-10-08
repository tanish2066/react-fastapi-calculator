from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Numbers(BaseModel):
    number1: int
    number2: int


@app.get("/")
def home():
    return {"message": "Hello from FastAPI"}


@app.post("/add")
def add(numbers: Numbers):
    return {"result": numbers.number1 + numbers.number2}