import os
import mysqldb
from dotenv import load_dotenv
load_dotenv()

from flask_cors import cross_origin
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/getprojectsdata", methods=['GET', 'POST'])
@cross_origin()
def getprojectsdatat():
    if request.method == 'GET':
        id = request.args.get('id', type = int)
        return mysqldb.returnprojects(id)
    return 'Cant Retrieve projects'

@app.route("/getotherprojectsdata", methods=['GET', 'POST'])
@cross_origin()
def getotherprojectsdata():
    if request.method == 'GET':
        id = request.args.get('id', type = int)
        return mysqldb.returnotherprojects(id)
    return 'Cant Retrieve other projects'

@app.route("/getexpensegroups", methods=['GET', 'POST'])
@cross_origin()
def getexpensegroups():
    if request.method == 'GET':
        return mysqldb.returnExpenseGroups()
    return 'Cant Retrieve expnese groups'

@app.route("/getprojects", methods=['GET', 'POST'])
@cross_origin()
def getprojects():
    if request.method == 'GET':
        return mysqldb.returnProjects()
    return 'Cant Retrieve projects'

@app.route("/getexpenseitems", methods=['GET', 'POST'])
@cross_origin()
def getexpenseitems():
    if request.method == 'GET':
        return mysqldb.returnExpenseitems()
    return 'Cant Retrieve expense items'

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8080)