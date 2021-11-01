CREATE TABLE `net-tantra`.`user_tbl` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_user_name` VARCHAR(250) NULL,
  `u_password` VARCHAR(250) NULL,
  `u_email` VARCHAR(250) NULL,
  PRIMARY KEY (`u_id`));
  
ALTER TABLE `net-tantra`.`user_tbl` 
ADD COLUMN `u_role` VARCHAR(45) NULL AFTER `u_email`;

CREATE TABLE `net-tantra`.`orders_tbl` (
  `o_id` INT NOT NULL AUTO_INCREMENT,
  `o_service_type` VARCHAR(45) NULL,
  `o_date` VARCHAR(45) NULL,
  `o_slot` VARCHAR(45) NULL,
  `o_phone` VARCHAR(45) NULL,
  `o_email` VARCHAR(450) NULL,
  `o_address` VARCHAR(45) NOT NULL,
  `o_created_at` DATETIME NULL,
  `o_update_at` DATETIME NULL,
  PRIMARY KEY (`o_id`, `o_address`));
ALTER TABLE `net-tantra`.`orders_tbl` 

ADD COLUMN `o_owner_name` VARCHAR(250) NULL AFTER `o_user_id`,
CHANGE COLUMN `o_user_id` `o_user_id` VARCHAR(45) NULL DEFAULT NULL AFTER `o_address`;
ALTER TABLE `net-tantra`.`orders_tbl` 
ADD COLUMN `o_status` VARCHAR(45) NULL AFTER `o_owner_name`,
CHANGE COLUMN `o_owner_name` `o_owner_name` VARCHAR(450) NULL DEFAULT NULL AFTER `o_user_id`;

ALTER TABLE `net-tantra`.`orders_tbl` 
CHANGE COLUMN `o_status` `o_status` VARCHAR(45) NULL DEFAULT NULL AFTER `o_owner_name`;

ALTER TABLE `net-tantra`.`orders_tbl` 
ADD COLUMN `o_exp_delivery_date` DATE NULL AFTER `o_owner_name`;

ALTER TABLE `net-tantra`.`orders_tbl` 
CHANGE COLUMN `o_exp_delivery_date` `o_exp_delivery_date` VARCHAR(30) NULL DEFAULT NULL ;

