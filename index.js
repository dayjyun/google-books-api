import inquirer from "inquirer";
import request from "request";
import fs from 'fs';
import { apiRequest } from "./apiRequest.js";

// Display my reading list
function displayReadingList(readingList){
    console.log(`\nMy Reading List:`)
    readingList.forEach((book, i) => {
        console.log(`${i + 1}. "${book.volumeInfo.title}" by ${book.volumeInfo.authors} (${book.volumeInfo.publisher})`)
    });
}


// Adds a book to the reading list
function addToReadingList(searchResults){
    let readingList = [];
    // Check if reading list file exists
    if (fs.existsSync("reading-list.json")) {
        readingList = JSON.parse(fs.readFileSync("reading-list.json"));
    }

    inquirer.prompt([
        {
            type: "input",
            name: "book",
            message: "Enter the number of the book you want to add to your reading list:",
            validate: input => {
                if(input > 0 && input < searchResults.length){
                    return true;
                } else {
                    console.log(`\nUnable to add book`)
                }
            }
        }
    ]).then((selection) => {
        // Select book
        let book = searchResults[selection.book - 1]
        // Add selected book to reading list
        readingList.push(book);
        fs.writeFileSync("reading-list.json", JSON.stringify(readingList));
        console.log(`\n"${book.volumeInfo.title}" added to your reading list!`);
        // Start the application again
        start()
    })
}


// Displays results from book search
function searchResults(books){
    if(!books){
        console.log(`\nBook not found. Try again.`)
        return searchForBookQuestion()
    }

    console.log(`\nResults: `)
    for(let i = 0; i < 5; i++){
        let book = books[i]
        console.log(`\n${[i + 1]}. "${book.volumeInfo.title}" by ${book.volumeInfo.authors} (${book.volumeInfo.publisher})\n`)
    }
}


// Secondary Menu
function selectionPrompt(books, readingList){
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
        displayReadingList(readingList);
        // Show the main menu again
        start();
      } else {
        // Quit the application
        console.log("\nGoodbye!");
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
            let readingList = [];
            // Check if reading list file exists
            if (fs.existsSync("reading-list.json")) {
                readingList = JSON.parse(fs.readFileSync("reading-list.json"));
            }
            selectionPrompt(books, readingList)
        })
    })
}


// Start the application
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
            // Show the main menu again
            start()
        } else {
            // Close the application
            console.log('\nGoodbye!')
        }
    })
}

start()
