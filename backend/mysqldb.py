import ray
import mysql.connector
import os
import json
from dotenv import load_dotenv
load_dotenv()
ray.init()

mydb = mysql.connector.connect(
  host=os.getenv('host'),
  user=os.getenv('user'),
  password=os.getenv('password'),
  database=os.getenv('database')
)

@ray.remote
def Jsonifly(rows):
    data = []
    for row in rows:
        #data.append([x for x in row]) # or simply data.append(list(row))
        data.append(list(row))
    # print(data)
    return data

def returnprojects(id):
    try:
        mycursor = mydb.cursor()

        mycursor.execute(f"select * from project.projects where id={id}")

        promisefuturedata = Jsonifly.remote(mycursor.fetchall())

        jsondata = ray.get(promisefuturedata)

        jsondata = {'projects': jsondata}

        jsondata = json.dumps(jsondata)

        print(jsondata)

        return jsondata
    except:
        print("Database Error")

def returnotherprojects(id):
    try:
        mycursor = mydb.cursor()

        mycursor.execute(f"select * from project.other_projects where id={id}")

        promisefuturedata = Jsonifly.remote(mycursor.fetchall())

        jsondata = ray.get(promisefuturedata)

        jsondata = {'projects': jsondata}

        jsondata = json.dumps(jsondata)

        print(jsondata)

        return jsondata
    except:
        print("Database Error")

#returnprojects(10002)
