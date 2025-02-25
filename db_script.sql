CREATE TABLE tbl_department (
  department_id int unsigned NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  description varchar(45) NOT NULL,
  is_active tinyint DEFAULT '1',
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (department_id),
  UNIQUE KEY department_id_UNIQUE (department_id)
);
