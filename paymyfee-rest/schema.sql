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
  state varchar(45) DEFAULT NULL,
  pincode varchar(15) DEFAULT NULL,
  verified char(1) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE(contactnumber)
);

INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified) VALUES ('Senthilkumar', 'Vaithiyanathan', 'sendmailtosenthil@gmail.com','8940059376','L&T Eden park', 'Siruseri', 'Chennai', 'Tamilnadu', '603103', 'N');


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
  PRIMARY KEY (id),
  UNIQUE(contactnumber)
);
INSERT INTO family (firstname, lastname, relationship, age, education, workingAs, yearlyIncome, comments) VALUES ('Senthilkumar', 'Vaithiyanathan', 'father',50,'12th', 'labour', 200000, 'None');





