import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

function searchForBookQuestion(){
    inquirer.prompt([
        {
            type: "input",
            name: "question",
            message: "What is the name of the book you are looking for?"
        }
    ]).then((search) => {
        // Makes a request to the Google Books API
        apiRequest(search.question, (books) => {
            // Returns the list of book results
        })
    })
}

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
            name: "option",
            message: "What would you like to do?",
            options: ["Search for a book", "View my reading list", "Quit"]
        }
    ]).then((selection) => {
        if(selection.option === "Search for a book"){
            // display a search query
            searchForBookQuestion()
        } else if (selection.option === "View my reading list"){
            // display my reading list
        } else {
            // Close the application
            console.log('Goodbye!')
        }
    })
}

start()
