create .venv virtualenv

pip install -r requirements.txt

for all the package

python3 main.py


http://127.0.0.1:5000/getprojectsdata?id=10003

{"projects": [[10003, "CSE", "10003", "10003", 50000, "5/30/2019", "5/30/2021"]]}

http://127.0.0.1:5000/getotherprojectsdata?id=90003

{"projects": [[90003, "CSE", "Rotating Quota 1", "10003"]]}