const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker',
});

function start(){
    inquirer.prompt([
        {
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Create','View', 'Update','Delete','Quit']
        }])
        .then((response)=>{
            switch (response.start){
                case 'Create':
                    create();
                    break;
                case 'View':
                    view();
                    break;
                case 'Update':
                    update();
                    break;
                case 'Delete':
                    delete1();
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })
}

function create(){
    inquirer.prompt([
        {
            name: 'create',
            type: 'list',
            message: 'What would you like to create?',
            choices: ['Department','Role', 'Employee']
        }])
    .then((response)=>{
        switch (response.create){
            case 'Department':
                createDepartment ();
                break;
            case 'Role':
                createRole ();
                break;
            case 'Employee':
                createEmployee ();
                break;
        }
    })
}

function view(){
    inquirer.prompt([
        {
            name: 'view',
            type: 'list',
            message: 'What would you like to view?',
            choices: ['Department','Role', 'Employee','Cost of employees per department']
        }])
    .then((response)=>{
        switch (response.view){
            case 'Department':
                viewDepartment();
                break;
            case 'Role':
                viewRole();
                break;
            case 'Employee':
                viewEmployee();
                break;
            case 'Cost of employees per department':
                viewCost();
                break;
        }
    })
}

function update(){
    inquirer.prompt([
        {
            name: 'update',
            type: 'list',
            message: 'What would you like to update?',
            choices: ['Update employee role','Update employee manager']
        }])
    .then((response)=>{
        switch (response.update){
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
        }
    })
}

function delete1(){
    inquirer.prompt([
        {
            name: 'update',
            type: 'list',
            message: 'What would you like to delete?',
            choices: ['Department','Role','Employee']
        }])
    .then((response)=>{
        switch (response.update){
            case 'Department':
                deleteDepartment();
                break;
            case 'Role':
                deleteRole();
                break;
            case 'Employee':
                deleteEmployee();
                break;
        }
    })

}
//still need to finish

function deleteDepartment(){

}
//still need to finish

function deleteRole(){

}
//still need to finish

function deleteEmployee(){

}
//still need to finish

function updateEmployeeRole(){
    connection.query('SELECT * FROM employee_tracker.employee',{},(err,res)=>{
        if (err) throw err;
        let employeeArray = [];
        for (var i = 0; i<res.length; i++){
            employeeArray.push(res[i].first_name);
        }
        updateEmployeeRole2(employeeArray);
    })
}

function updateEmployeeRole2(employeeArray){
    inquirer.prompt([
        {
            name: 'updateName',
            type: 'list',
            message: 'Whos role would you like to update?',
            choices: employeeArray
        },
        {
            name: 'newRoleId',
            type: 'input',
            message: 'What new role_id would you like to give?',
        },

    ])
        .then((response)=>{
            connection.query('UPDATE employee SET ? WHERE ?',
            [
                {role_id:response.newRoleId},
                {first_name:response.updateName}
            ],(err, res ) => {
                if (err) throw err;
                console.log(res)
    
            } )
        })
}



//still need to finish

function updateEmployeeManager(){
    
}

function viewDepartment(){
    connection.query('SELECT * FROM employee_tracker.department', 
    {

    },(err,response) => {
        if (err) throw err;
        console.table(response)
        askRepeat();
    })
}

function viewRole(){
    connection.query('SELECT * FROM employee_tracker.role', 
    {

    },(err,response) => {
        if (err) throw err;
        console.table(response)
        askRepeat();
    })
}

function viewEmployee(){
    connection.query('SELECT * FROM employee_tracker.employee', 
    {

    },(err,response) => {
        if (err) throw err;
        console.table(response)
        askRepeat();
    })
}
//still need to finish
function viewCost(){
    connection.query('SELECT * FROM ')
    
    
    inquirer.prompt([
        {
            name: 'cost',
            type: 'list',
            message: 'view the combined salaries of all employees in a department',
            choices: ['','']
        }])
}

function createDepartment (){
    inquirer.prompt([
        {
            name: 'createD',
            type: 'input',
            message: 'what is the name of the new department?'
        }])
        .then((response)=>{
            connection.query('INSERT INTO department SET ?',
            {
                name: response.createD
            },(err) => {
                if (err) throw err;
                askRepeat();
            });
        })
}

function createRole(){
    inquirer.prompt([
        {
            name: 'nameR',
            type: 'input',
            message: 'What is the name of the new role?'
        },
        {
            name: 'salaryR',
            type: 'input',
            message: 'What is the yearly salary of the role?'
        },
        {
            name: 'departmentR',
            type: 'input',
            message: 'What is the department id that the role belongs to?'
        }
    ])
        .then((response)=>{
            connection.query('INSERT INTO role SET ?',
            {
                title: response.nameR,
                salary: response.salaryR,
                department_id: response.departmentR

            },(err) => {
                if (err) throw err;
                askRepeat();
            });
        })
}

function createEmployee(){
    inquirer.prompt([
        {
            name: 'firstE',
            type: 'input',
            message: 'First name of employee?'
        },
        {
            name: 'lastE',
            type: 'input',
            message: 'Last name of employee?'
        },
        {
            name: 'roleIdE',
            type: 'input',
            message: 'What role id would you like to give this employee?'
        },
        {
            name: 'managerIdE',
            type: 'input',
            message: 'What is the ID of the manager for this employee? (leave blank if this employee hasno manager) '
        },
    ])
    .then((response)=>{
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: response.firstE,
            last_name: response.lastE,
            role_id: response.roleIdE,
            manager_id: response.managerIdE
        },(err) => {
            if (err) throw err;
            askRepeat();
        });
    })

}

function askRepeat(){
    inquirer.prompt([
        {
            name: 'repeat',
            type: 'list',
            message: 'would you like to go back to the start?',
            choices: ['Yes, take me back','No, I want to quit']
        }])
    .then((response)=>{
        switch (response.repeat){
            case 'Yes, take me back':
                start();
                break;
            case 'No, I want to quit':
                connection.end();
                break;
        }
    })
}

start();