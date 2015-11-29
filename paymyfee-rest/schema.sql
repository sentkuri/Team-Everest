CREATE SCHEMA paymyfee DEFAULT CHARACTER SET utf8;
USE paymyfee;

CREATE TABLE receipient (
  id int(10) NOT NULL AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  contactnumber varchar(12) NOT NULL,
  address_line1 varchar(100) DEFAULT NULL,
  address_line2 varchar(100) DEFAULT NULL,
  city varchar(45) DEFAULT NULL,
  area varchar(45) Default null,
  state varchar(45) DEFAULT NULL,
  pincode varchar(15) DEFAULT NULL,
  verified char(1) DEFAULT NULL,
  moneyrequired int ,
  singleparent char(1),
  marks int,
  picture LONGTEXT,
  PRIMARY KEY (id)
);


INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Senthilkumar', 'Vaithiyanathan', 'sendmailtosenthil@gmail.com','8940059376','L&T Eden park', 'Siruseri', 'Chennai', 'Tamilnadu', '603103', 'N',25000,'Y',90,"http://www.studentnoodles.co.uk/wp-content/uploads/2014/03/avatar.png");


CREATE TABLE family (
  id int(10) NOT NULL AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  relationship varchar(20) NOT NULL,
  age int(3) NOT NULL,
  education varchar(20) NOT NULL,
  workingAs varchar(20) NOT NULL,
  yearlyIncome int(7) NOT NULL,
  comments varchar(300) NOT NULL,
  receipientid INT,  
    FOREIGN KEY (receipientid) 
        REFERENCES receipient(id)
        ON DELETE CASCADE,
  PRIMARY KEY (id));
  
INSERT INTO family (firstname, lastname, relationship, age, education, workingAs, yearlyIncome, comments) VALUES ('Senthilkumar', 'Vaithiyanathan', 'father',50,'12th', 'labour', 200000, 'None');


create table user (
    userid int(10) NOT NULL AUTO_INCREMENT,
    userType int(2) NOT NULL ,
    username varchar(20) NOT NULL unique,
    password varchar(20) NOT NULL,
    PRIMARY KEY (userid)
);

create table school (
    schoolid int(10) NOT NULL AUTO_INCREMENT,
    schoolName varchar(20) NOT NULL ,
    schooladdress varchar(20) NOT NULL,
    contactnumber varchar(12) NOT NULL ,
    userid int,
    PRIMARY KEY (schoolid),
    FOREIGN KEY (userid) 
        REFERENCES user(userid)
        ON DELETE CASCADE
);

create table ngo (
    ngoid int(10) NOT NULL AUTO_INCREMENT,
    ngoname  varchar(100) NOT NULL ,
    fundinglimit int(8) NOT NULL,
	category varchar(20),
    PRIMARY KEY (ngoid)
);

create table fundingTable (
    id int NOT NULL AUTO_INCREMENT,
    studentid int,
    ngoid int,
    fundingplanned int(8),
    PRIMARY KEY(id),
    FOREIGN KEY (studentid) 
        REFERENCES user(userid)
        ON DELETE CASCADE,
    FOREIGN KEY (ngoid) 
        REFERENCES ngo(ngoid)
        ON DELETE CASCADE    
);

create table interestedTable (
    id int NOT NULL AUTO_INCREMENT,
    studentid int,
    ngoid int,    
    PRIMARY KEY(id),
    FOREIGN KEY (studentid) 
        REFERENCES user(userid)
        ON DELETE CASCADE,
    FOREIGN KEY (ngoid) 
        REFERENCES ngo(ngoid)
        ON DELETE CASCADE           
);


INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Senthilkumar', 'Vaithiyanathan', 'sendmailtosenthil@gmail.com','8940059376','L&T Eden park', 'Siruseri', 'Chennai', 'Tamilnadu', '603103', 'N',25000,'Y',90,"http://thumb9.shutterstock.com/thumb_small/1294/104909726/stock-photo-casual-student-holding-backpack-and-headphones-isolated-over-white-104909726.jpg");

 
 INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Muthukumar', 'Sundararajan', 'sendmailtomuthu@gmail.com','9987678989','ABlock', 'Pallavaram', 'Chennai', 'Tamilnadu', '603102', 'N',75000,'N',95,"http://utm.toronto.edu/sites/files/default/public/shared/registrar/images/samsmall.png");
 
 
 INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Siva', 'Lord', 'sendmailtosiva@gmail.com','9879087623','Ray street', 'JP area', 'Madurai', 'Tamilnadu', '603102', 'N',55000,'N',55,"https://media.licdn.com/mpr/mpr/shrink_100_100/p/8/005/085/179/21348f3.jpg");
 
 
 
 INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Hari', 'Kan', 'sendmailtohari@gmail.com','9079087623','Ray Lane', 'JP arena', 'Coimbatore', 'Tamilnadu', '603101', 'Y',50000,'N',85,"http://www.sbs.com.au/news/sites/sbs.com.au.news/files/styles/thumb_small/public/apple_student_still.jpg?itok=1foJGAQa");
 
 INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture)
 VALUES ('Sandhya', 'sai', 'sendmailtosandyi@gmail.com','9016087623','Riy puram', 'JPks arena', 'Sivakasi', 'Tamilnadu', '603109', 'Y',75000,'N',65," http://thumb7.shutterstock.com/thumb_small/817606/156093551/stock-photo-a-smiling-female-student-holding-books-isolated-on-white-background-156093551.jpg");
 
 

