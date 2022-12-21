import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

// Displays results from book search
function searchResults(books){
    if(!books){
        console.log(`Book not found`)
    }

    for(let i = 0; i < 5; i++){
        let book = books[i]
        console.log(`${book.volumeInfo.title}`)
    }
}

// Adds a book to the reading list

// Prompts the user to search for a book
function searchForBookQuestion(){
    inquirer.prompt([
        {
            type: "input",
            name: "query",
            message: "What is the name of the book you are looking for?"
        }
    ]).then((search) => {
        // Makes a request to the Google Books API
        apiRequest(search.query, (books) => {
            // Displays results from book search
            searchResults(books)
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
            name: "choice",
            message: "What would you like to do?",
            choices: ["Search for a book", "View my reading list", "Quit"]
        }
    ]).then((selection) => {
        if(selection.choice === "Search for a book"){
            // display a search query
            searchForBookQuestion()
        } else if (selection.choice === "View my reading list"){
            // display my reading list
        } else {
            // Close the application
            console.log('Goodbye!')
        }
    })
}

start()
