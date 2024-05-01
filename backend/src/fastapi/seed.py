import psycopg
from psycopg.rows import dict_row
# connection = psycopg.connect("postgresql://postgres:postgres@db:5432/postgres")

# from dotenv import load_dotenv
# load_dotenv()

# import os
# postgres_connection = os.environ.get(
#             "SQL_CONNECTION_STRING", "NO_CONNECTION_STRING_FOUND"
#         )

#  with connection as conn, conn.cursor() as cur:
#         cur.executemany("INSERT INTO threads (id, account_id, created_at) VALUES (%s, %s, %s);",
#                         [(1, 1, 2019),(1, 1, 2019)])

# with conn.cursor(row_factory=dict_row) as cur:
#     cur.execute(sql_string, sql_params)
#     data = cur.fetchall()

# def add_user_table():
#     with connection as conn, conn.cursor(row_factory=dict_row) as cur:
#             cur.execute("""
#     CREATE TABLE IF NOT EXISTS users (
#         user_id SERIAL PRIMARY KEY,
#         username VARCHAR(50) NOT NULL,
#         email VARCHAR(100) NOT NULL
#     );""")

# if __name__ == "__main__":
#     add_user_table()