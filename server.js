  const mysql = require('mysql2');
  const cTable = require('console.table');
  const inquirer = require('inquirer');

  // Connect to database
  const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Shivamir1989@',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );


  const init = () => {
    inquirer.prompt([
        {
          type: "list",
          name: "choices",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Exit"
          ]
        }
      ]).then(answer => {
      switch (answer.choices) {
        case "View all departments": viewDepartments();
            break;
        
        case  "View all roles": viewRoles();
            break;

        case "View all employees": viewEmployees();
            break;

        case "Add a department": addDepartment();
            break;

        case "Add a role": addRole();
            break;

        case "Add an employee": addEmployee();
            break;

        case "Exit":
          process.exit();

      }
      }).catch(err => console.error(err));
      }

      init();



      const viewDepartments = () => {
        db.query(`SELECT * FROM department`, (err, results) => {      
          if (err) {
            console.error(err);
          } else {
            console.table(results);  
          }
          init();
        })
      };
  
    const viewRoles = () => {
      db.query(`SELECT * FROM role`, (err, results) => {      
        if (err) {
          console.error(err);
        } else {
          console.table(results);  
        }
        init();
      })
    };


    const viewEmployees = () => {
      db.query(`SELECT * FROM employee`, (err, results) => {      
        if (err) {
          console.error(err);
        } else {
          console.table(results);  
        }
        init();
      })
    };

    const addDepartment = () => {
      inquirer.prompt([
      {
      type: 'input',
      message: "What is the name of the new department?",
      name: 'deptName'
      },
      ])
      .then((answer => {
        db.query(`INSERT INTO department(name) VALUES(?)` , answer.deptName, (err, results) => {
          if (err) {
            console.log(err)
          } else {
            db.query(`SELECT * FROM department`, (err, results) => {
              if (err) {
                console.error(err);
              } else {
                console.table(results);  
              }
              init();
            })
          }
          })
        })
      )}; 
 

      const addRole = () => {
      const sql2 = `SELECT * FROM department`;
    db.query(sql2, (error, response) => {
        departmentList = response.map(departments => ({
            name: departments.name,
            value: departments.id
        }));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which Department does the role belong to?',
                choices: departmentList
            }
        ]).then((answer) => {
            const sql = `INSERT INTO role SET title='${answer.title}', salary= ${answer.salary}, department_id= ${answer.department};`
            db.query(sql, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added " + answer.title + " to the database")
                init();
            });
        });
    });
};



  const addEmployee = () => {
    const sql2 = `SELECT * FROM employee`;
    db.query(sql2, (error, response) => {
        employeeList = response.map(employees => ({
            name: employees.first_name.concat(" ", employees.last_name),
            value: employees.id
        }));

    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (error, response) => {
        roleList = response.map(role => ({
            name: role.title,
            value: role.id
        }));
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'last',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleList
                }
            ]).then((answer) => {
                const sql = `INSERT INTO employee SET first_name='${answer.first}', last_name= '${answer.last}', role_id= ${answer.role};`
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Added " + answer.first + " " + answer.last + " to the database")
                    init();
                });
            });
        });
    });
};

  
        
      
        





