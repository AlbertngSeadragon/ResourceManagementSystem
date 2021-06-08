CREATE DATABASE user_management;
USE user_management;

create table General_Office_GO_Staffs(
	go_id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (go_id)
);
ALTER TABLE General_Office_GO_Staffs AUTO_INCREMENT=100000000;

create table Professors(
	professor_id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (professor_id)
);
ALTER TABLE Professors AUTO_INCREMENT=900000000;

create table Admins(
	admin_id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (admin_id)
);
ALTER TABLE Admins AUTO_INCREMENT=1;

Generate Model:

bin git:(main) ✗ node sequelize-auto -o "./models" -d user_management -h fyp2021-2022.cysnvin5kbik.us-east-1.rds.amazonaws.com -u admin -p 3306 -x adminfyp2021 -e mysql 