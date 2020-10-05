const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname);
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = []

const restOfTheTeam = () => {
    inquirer.prompt ([
        {
            type: "list",
            choices: ["Manager", "Engineer", "Intern", "Create"],
            name: "Role",
            message: "Choose what role you wish to create:"
        },
    ])
    .then(result => {
        console.log(result)
        switch (result.Role) {
            case 'Manager':
                addManager();
                break;
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            case 'Create':
                createTeam();
        };
    });
};
restOfTheTeam();

const addManager = () => {
    inquirer.prompt ([        
        {
            type: "input",
            name: "name",
            message: "What is your name:"
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID:"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email:"
        },
        {
            type: "input",
            name: "officenumber",
            message: "What is your office number:"
        },
    ])
    .then(result => {
        const manager = new Manager(result.name, result.id, result.email, result.officenumber)
        employeeArray.push(manager)
        restOfTheTeam()
    });
};

const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Engineer's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Engineer's email:"
        },
        {
            type: "input",
            name: "Github",
            message: "Engineer's Github username:",
        },
    ])
    .then(result => {
        const engineer = new Engineer(result.name, result.id, result.email, result.Github)
        employeeArray.push(engineer)
        restOfTheTeam()
    });
};

const addIntern = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Intern's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Intern's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Intern's email:"
        },
        {
            type: "input",
            name: "school",
            message: "Intern's attended school:"
        },
    ])
    .then(result => {
        const intern = new Intern(result.name, result.id, result.email, result.school)
        employeeArray.push(intern)
        restOfTheTeam()
    })
};

const createTeam = () => {
    console.log(employeeArray)
    fs.writeFile(outputPath, render(employeeArray), 
    (err) => {
        if (err){
            throw err
        } else {
            console.log("Completed")
        }
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
