from fastapi import FastAPI, Request
import psycopg
from fastapi.responses import JSONResponse, Response
import uvicorn
from psycopg.rows import dict_row

app = FastAPI(debug=True)
connection = psycopg.connect("postgresql://postgres:postgres@db:5432/database")


@app.get("/")
def ping(req: Request):
    response_object = {"health": "OM"}
    
    return JSONResponse(content=response_object)


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, workers=1)