import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

// Display my reading list



// Adds a book to the reading list



// Displays results from book search
function searchResults(books){
    if(!books){
        console.log(`Book not found. Try again.`)
        return searchForBookQuestion()
    }

    for(let i = 0; i < 5; i++){
        let book = books[i]
        console.log(`"${book.volumeInfo.title}" by ${book.volumeInfo.authors} (${book.volumeInfo.publisher})`)
    }
}


// Prompts the user to search for a book
function searchQuery(){
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
            // what do to after search results?
            // add to list
            // search for a new book
            // view my list
            // close application
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
            // Display a search query
            searchQuery()
        } else if (selection.choice === "View my reading list"){
            // Display my reading list
        } else {
            // Close the application
            console.log('Goodbye!')
        }
    })
}

start()
