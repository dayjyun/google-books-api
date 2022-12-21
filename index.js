import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

// Display my reading list
function displayReadingList(readingList){
    console.log(`My Reading List: `)
    readingList.forEach(book => {
        `"${book.volumeInfo.title}" by ${book.volumeInfo.authors} (${book.volumeInfo.publisher})`
    });
}


// Adds a book to the reading list
function addToReadingList(searchResults){
    // Pass in the array of books
    // Add book by name
    inquirer.prompt([
        {
            type: "input",
            name: "book",
            message: "Enter the name of the book you want to add to your reading list: ",
            validate: input => {
                if(input.name === input.message){
                    return true;
                }
            }
        }
    ]).then((selection) => {
        for(let i = 0; i < searchResults.length; i++){
            let book = readingList[i]
            if(book === selection){

                console.log(`${book} added to reading list!`)
            }
        }
        // Start the application again
        start()
    })
}


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

function selectionPrompt(books){
  // view my list

  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "Add book to my reading list",
          "Search for a book",
          "View my reading list",
          "Quit",
        ],
      },
    ])
    .then((selection) => {
      if (selection.choice === "Add book to my reading list") {
        // Add book to reading list prompt
        addToReadingList(books);
      } else if (selection.choice === "Search for a book") {
        // New search for book
        searchQuery();
      } else if (selection.choice === "View my reading list") {
        // Display my reading list
        displayReadingList();
      } else {
        // Quit the application
        console.log("Goodbye!");
      }
    });
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
            // Displays a new menu after results return
            selectionPrompt(books)
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
            // Display a search query to search for a book by name
            searchQuery()
        } else if (selection.choice === "View my reading list"){
            // Display my reading list
            displayReadingList(readingList)
        } else {
            // Close the application
            console.log('Goodbye!')
        }
    })
}

start()
