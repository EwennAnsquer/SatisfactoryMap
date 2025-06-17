from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import time
from minio import Minio
import os

app = Flask(__name__)
cors = CORS(app, origin='*')

minioClient = Minio(
    "minio", #hostname or address of the MinIO server
    access_key=os.environ.get("MINIO_ROOT_USER"),
    secret_key=os.environ.get("MINIO_ROOT_PASSWORD"),
    secure=False
)

def get_connection():
    max_attempts=10
    for i in range(max_attempts):
        try:
            return mysql.connector.connect(
                host='SatisfactoryMapDB',
                user=os.environ.get("MYSQL_ROOT_USER"),
                password=os.environ.get("MYSQL_ROOT_PASSWORD"),
                database=os.environ.get("MYSQL_DATABASE")
            )
        except mysql.connector.Error as err:
            print(f"Tentative {i+1} de connexion à la DB échouée : {err}.")
            time.sleep(5)
    raise Exception("Impossible de se connecter à la DB après 10 tentatives.")

@app.route("/api/users", methods=['GET'])
def users():
    con=get_connection()
    cursor=con.cursor()
    cursor.execute("SELECT * FROM Users;")
    users=cursor.fetchall()
    cursor.close()
    con.close()
    users_name=[user[1] for user in users]
    return jsonify({"users":users_name}),200
    
if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0")