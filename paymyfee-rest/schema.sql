CREATE SCHEMA paymyfee DEFAULT CHARACTER SET utf8;
USE paymyfee;

CREATE TABLE receipient (
  id int(10) NOT NULL AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  contactnumber int(10) NOT NULL,
  address_line1 varchar(100) DEFAULT NULL,
  address_line2 varchar(100) DEFAULT NULL,
  city varchar(45) DEFAULT NULL,
  state varchar(45) DEFAULT NULL,
  pincode varchar(15) DEFAULT NULL,
  verified char(1) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE(contactnumber)
);

