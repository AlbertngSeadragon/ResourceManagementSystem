from readline import append_history_file
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

# def returnprojects(id):
#     try:
#         mycursor = mydb.cursor()

#         mycursor.execute(f"select * from project.projects where id={id}")

#         promisefuturedata = Jsonifly.remote(mycursor.fetchall())

#         jsondata = ray.get(promisefuturedata)

#         jsondata = {'projects': jsondata}

#         jsondata = json.dumps(jsondata)

#         print(jsondata)

#         return jsondata
#     except:
#         print("Database Error")

# def returnotherprojects(id):
#     try:
#         mycursor = mydb.cursor()

#         mycursor.execute(f"select * from project.other_projects where id={id}")

#         promisefuturedata = Jsonifly.remote(mycursor.fetchall())

#         jsondata = ray.get(promisefuturedata)

#         jsondata = {'projects': jsondata}

#         jsondata = json.dumps(jsondata)

#         print(jsondata)

#         return jsondata
#     except:
#         print("Database Error")

def returnExpenseGroups():
    try:
        mycursor = mydb.cursor()

        mycursor.execute(f"select id, title from test_projects_balance_expense.ExpenseGroups;")
        

        promisefuturedata = Jsonifly.remote(mycursor.fetchall())

        jsondata = ray.get(promisefuturedata)

        print(jsondata)

        append_json = []
        for row in jsondata:
            jsondata1 = {"id":row[0], "title":row[1]}
            append_json.append(jsondata1)
        ## jsondata = {'ExpenseGroups': jsondata}

        ##jsondata1 = json.dumps(jsondata1)

        ##print(append_json)

        finaldata = {'ExpenseGroups': append_json}

        print(finaldata)

        return finaldata
    except:
        print("Database Error3")

# def returnProjects():
#     try:
#         mycursor = mydb.cursor()

#         mycursor.execute(f"select id, projectName, initialBalance, start_time, end_time, bgColor from test_projects_balance_expense.Projects")

#         promisefuturedata = Jsonifly.remote(mycursor.fetchall())

#         jsondata = ray.get(promisefuturedata)

#         # jsondata = {'Projects': jsondata}

#         # jsondata = json.dumps(jsondata)

#         # print(jsondata)

#         # return jsondata

#         print(jsondata)

#         append_json = []
#         for row in jsondata:
#             jsondata1 = {"id":row[0], "projectName":row[1], "initialBalance":row[2], "start_time":row[3], "end_time":row[4], "bgColor":row[5]}
#             append_json.append(jsondata1)
#         ## jsondata = {'ExpenseGroups': jsondata}

#         ##jsondata1 = json.dumps(jsondata1)

#         ##print(append_json)

#         finaldata = {'Projects': append_json}

#         print(finaldata)
#         return finaldata
#     except:
#         print("Database Error4")

def returnProjects():
    try:
        mycursor = mydb.cursor()

        mycursor.execute(f"select id, projectName, initialBalance, start_time, end_time, bgColor from test_projects_balance_expense.Projects")

        promisefuturedata = Jsonifly.remote(mycursor.fetchall())

        jsondata = ray.get(promisefuturedata)

        # jsondata = {'Projects': jsondata}

        # jsondata = json.dumps(jsondata)

        # print(jsondata)

        # return jsondata

        print(jsondata)

        append_json = []
        for row in jsondata:
            jsondata1 = {"id":row[0], "projectName":row[1], "initialBalance":row[2], "start_time":row[3], "end_time":row[4], "bgColor":row[5]}
            append_json.append(jsondata1)
        ## jsondata = {'ExpenseGroups': jsondata}

        ##jsondata1 = json.dumps(jsondata1)

        ##print(append_json)

        finaldata = {'Projects': append_json}

        print(finaldata)
        return finaldata
    except:
        print("Database Error4")

def returnExpenseitems():
    try:
        mycursor = mydb.cursor()

        mycursor.execute(f"select id, group_, title, start_time, end_time, bgColor, expense, description_, isWhatIF from test_projects_balance_expense.ExpenseItems")

        promisefuturedata = Jsonifly.remote(mycursor.fetchall())

        jsondata = ray.get(promisefuturedata)

        # jsondata = {'Projects': jsondata}

        # jsondata = json.dumps(jsondata)

        # print(jsondata)

        # return jsondata

        print(jsondata)

        append_json = []
        for row in jsondata:
            row[3] = row[3].replace("\\", "")
            row[4] = row[4].replace("\\", "")
            jsondata1 = {"id":row[0], "group":row[1], "title":row[2], "start_time":row[3], "end_time":row[4], "bgColor":row[5], "expense":row[6], "description":row[7], "isWhatIF":row[8]}
            append_json.append(jsondata1)
        ## jsondata = {'ExpenseGroups': jsondata}

        ##jsondata1 = json.dumps(jsondata1)

        ##print(append_json)

        finaldata = {'ExpenseItems': append_json}

        print(finaldata)
        return finaldata
    except:
        print("Database Error5")

#returnprojects(10002)

#returnExpenseGroups()
#returnProjects()
#returnExpenseitems()
