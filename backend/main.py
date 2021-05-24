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

if __name__ == '__main__':
    app.debug = True
    app.run()