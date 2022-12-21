import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

function start(){
    let readingList = [];
    // Check if reading list file exists
    if(fs.existsSync('reading-list.json')){
        readingList = JSON.parse(fs.readFileSync("reading-list.json"))
    }

    // Main menu
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["Search for a book", "View my reading list", "Quit"]
        }
    ]).then((answers) => {
        if(answers.choice === "Search for a book"){
            // display a search query
        } else if (answers.choice === "View my reading list"){
            // display my reading list
        } else {
            // Close the application
            console.log('Goodbye!')
        }
    })
}

start()
