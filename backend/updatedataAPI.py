import os
from dotenv import load_dotenv
load_dotenv()

from flask_cors import cross_origin
from flask import Flask, request, render_template
import mysql.connector

mydb = mysql.connector.connect(
  host=os.getenv('host'),
  user=os.getenv('user'),
  password=os.getenv('password'),
  database=os.getenv('database')
)

app = Flask(__name__)

@app.route("/updateProjectdata", methods=['GET', 'POST'])
@cross_origin()
def updateProjectdata():
    if request.method == 'POST':
        request_data = request.get_json()
        # print(len(request_data['Projects']))
        mycursor = mydb.cursor()
        mycursor.execute("USE test_projects_balance_expense")
        mycursor.execute("create table Project1("+
            "id int NOT NULL AUTO_INCREMENT,"+
            "projectName varchar(255),"+
            "initialBalance int NOT NULL,"+
            "start_time varchar(255),"+
            "end_time varchar(255),"+
            "bgColor varchar(255),"+
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"+
            "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,"+
            "PRIMARY KEY(id)"+
        ")")
        mycursor.execute("ALTER TABLE Project1 AUTO_INCREMENT=0")
        preDBdata = []
        for i in range(len(request_data['Projects'])):
            tmp = []
            #tmp.append(request_data['Projects'][i]['id'])
            tmp.append(request_data['Projects'][i]['projectName'])
            tmp.append(request_data['Projects'][i]['initialBalance'])
            tmp.append(request_data['Projects'][i]['start_time'])
            tmp.append(request_data['Projects'][i]['end_time'])
            tmp.append(request_data['Projects'][i]['bgColor'])
            preDBdata.append(tuple(tmp))
        print(preDBdata)
        mycursor.executemany('INSERT INTO Project1 (projectName, initialBalance, start_time, end_time, bgColor) values(%s,%s,%s,%s,%s)', preDBdata)
        mycursor.execute("DROP Table test_projects_balance_expense.Projects")
        mycursor.execute("RENAME TABLE test_projects_balance_expense.Project1 TO test_projects_balance_expense.Projects")
        
        mydb.commit()
        mycursor.close()
        #mydb.close()
        return "Success 200 Update Projects"
    return 'Cant Update projects data'

@app.route("/updateExpenseGroups", methods=['GET', 'POST'])
@cross_origin()
def updateExpenseGroups():
    if request.method == 'POST':
        request_data = request.get_json()
        mycursor = mydb.cursor()
        mycursor.execute("USE test_projects_balance_expense")
        mycursor.execute("create table ExpenseGroups1("+
            "id int NOT NULL AUTO_INCREMENT,"+
            "title varchar(255),"+
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"+
            "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,"+
            "PRIMARY KEY(id)"+
        ")")
        mycursor.execute("ALTER TABLE ExpenseGroups1 AUTO_INCREMENT=1")
        preDBdata = []
        for i in range(len(request_data['ExpenseGroups'])):
            tmp = []
            tmp.append(request_data['ExpenseGroups'][i]['title'])
            preDBdata.append(tuple(tmp))
        print(preDBdata)
        mycursor.executemany('INSERT INTO ExpenseGroups1 (title) values(%s)', preDBdata)
        mycursor.execute("DROP Table test_projects_balance_expense.ExpenseGroups")
        mycursor.execute("RENAME TABLE test_projects_balance_expense.ExpenseGroups1 TO test_projects_balance_expense.ExpenseGroups")
        
        mydb.commit()
        mycursor.close()
        #mydb.close()
        return "Success 200 Update ExpenseGroups"
    return 'Cant Update ExpenseGroups'

@app.route("/updateExpenseItems", methods=['GET', 'POST'])
@cross_origin()
def updateExpenseItems():
    if request.method == 'POST':
        request_data = request.get_json()
        mycursor = mydb.cursor()
        mycursor.execute("USE test_projects_balance_expense")
        mycursor.execute("create table ExpenseItems1("+
            "id int NOT NULL AUTO_INCREMENT,"+
            "group_ int NOT NULL,"+
            "title varchar(255),"+
            "start_time varchar(255),"+
            "end_time varchar(255),"+
            "bgColor varchar(255),"+
            "expense int NOT NULL,"+
            "description_ varchar(255),"+
            "isWhatIF BOOLEAN,"+
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"+
            "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,"+
            "PRIMARY KEY(id)"+
        ")")
        mycursor.execute("ALTER TABLE ExpenseItems1 AUTO_INCREMENT=1")
        preDBdata = []
        for i in range(len(request_data['ExpenseItems'])):
            tmp = []
            tmp.append(request_data['ExpenseItems'][i]['group'])
            tmp.append(request_data['ExpenseItems'][i]['title'])
            tmp.append(request_data['ExpenseItems'][i]['start_time'])
            tmp.append(request_data['ExpenseItems'][i]['end_time'])
            tmp.append(request_data['ExpenseItems'][i]['bgColor'])
            tmp.append(request_data['ExpenseItems'][i]['expense'])
            tmp.append(request_data['ExpenseItems'][i]['description'])
            tmp.append(request_data['ExpenseItems'][i]['isWhatIF'])
            preDBdata.append(tuple(tmp))
        print(preDBdata)
        mycursor.executemany('INSERT INTO ExpenseItems1 (group_, title, start_time, end_time, bgColor, expense, description_, isWhatIF) values(%s,%s,%s,%s,%s,%s,%s,%s)', preDBdata)
        mycursor.execute("DROP Table test_projects_balance_expense.ExpenseItems")
        mycursor.execute("RENAME TABLE test_projects_balance_expense.ExpenseItems1 TO test_projects_balance_expense.ExpenseItems")
        
        mydb.commit()
        mycursor.close()
        #mydb.close()
        return "Success 200 Update ExpenseItems"
    return 'Cant Update ExpenseItems'


if __name__ == '__main__':
    app.debug = True
    app.run()
