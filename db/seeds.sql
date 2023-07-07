INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 110000, 1), 
("Salesperson", 85000, 1), 
("Lead Engineer", 120000, 2), 
("Software Engineer", 140000, 2), 
("Accountant", 85000, 3), 
("Legal Team Lead", 150000, 4), 
("Lawyer", 290000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Leo", "Love", 1, 3), 
("Katy", "Tian", 2, NULL), 
("Lucas", "Milo", 3, NULL),
("Joe", "Bett", 4, 1), 
("Pam", "Kian", 5, 1), 
("Rose", "Suee", 6, 2), 
("Jen", "Dell", 7, 6), 
("Drew", "Samba", 5, 1), 
("Ria", "Riyaz", 4, NULL);
