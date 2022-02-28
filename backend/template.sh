#!/bin/bash -ex
sudo apt-get update
sudo apt-get install python3
sudo apt-get install python3-pip -y
sudo apt-get install nginx -y
sudo apt-get install gunicorn -y
git clone --branch feature/add-preview-functionv2 https://github.com/AlbertngSeadragon/ResourceManagementSystem
cd ResourceManagementSystem/backend/
pip install -r requirements.txt
echo -e "host=''\nuser=''\npassword=''\ndatabase=''" >> .env
nohup python3 main.py &

# pgrep <process-type>
# pgrep python
# pgrep gunicorn
# sudo kill <process-id>

# https://medium.com/analytics-vidhya/deploy-a-flask-app-on-amazon-aws-ec2-and-keep-it-running-while-you-are-offline-38d22571e2c5

# wrong sudo amazon-linux-extras -y install nginx1
#!/bin/bash
sudo yum -y update
sudo yum install python3
sudo yum install python3-pip
yes | sudo amazon-linux-extras install nginx1
sudo systemctl restart nginx
systemctl status nginx
sudo yum -y install git
git clone --branch feature/add-preview-functionv2 https://github.com/AlbertngSeadragon/ResourceManagementSystem
cd ResourceManagementSystem/backend/
pip3 install -r requirements.txt
pip3 install gunicorn
echo -e "host=''\nuser=''\npassword=''\ndatabase=''" >> .env
gunicorn --bind 0.0.0.0:8080 main:app
#nohup python3 main.py &

https://berkoc.medium.com/how-to-deploy-your-flask-app-to-aws-ec2-instance-with-nginx-gunicorn-b734df606a14


#testing 
sudo amazon-linux-extras install epel