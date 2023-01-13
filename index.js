import inquirer from "inquirer";
import request from "request";
import fs from 'fs';

// Makes request to the Google Books API
function apiRequest(query, callback) {
  request(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyAJWbVyKezNHmebT3Wa7Xza5PX3AMNYcM8`,
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }

      const data = JSON.parse(body);
      callback(data.items);
    }
  );
}


// Display my reading list
export function displayReadingList(readingList){
    console.log(`\nMy Reading List: ${readingList.length} ${readingList.length === 1 ? "Book" : "Books"}`)

    // If there are no books on reading list
    if(!readingList.length){
        console.log(`\nEMPTY\n`)
    }

    readingList.forEach((book, i) => {
        console.log(`\n${i + 1}. "${book.volumeInfo.title}" by ${book.volumeInfo.authors} (${book.volumeInfo.publisher})\n`)
    });
}


// Adds a book to the reading list
export default function addToReadingList(searchResults){
    let readingList = [];
    // Check if reading list JSON file exists
    if (fs.existsSync("reading-list.json")) {
        readingList = JSON.parse(fs.readFileSync("reading-list.json"));
    }

    let errSentence = `Invalid input. Please enter a whole number between 1 and 5.`

    inquirer.prompt([
        {
            type: "input",
            name: "book",
            message: "Enter a number between 1 and 5 for the book you want to add to your reading list:",
            validate: input => {
                if(Number.isInteger(+input) && input > 0 && input < 6){
                    return true;
                } else {
                    console.log(`\n${errSentence}`);
                    return false;
                }
            }
        }
    ]).then((selection) => {
        // Select book
        let book = searchResults[selection.book - 1]
        // Check if book is already in the reading list
         if (readingList.some((bk) => bk.id === book.id)) {
           console.log(`\nBook is already in your reading list`);
           // Start the application again
           start();
         } else if(selection.book % 1 !== 0) {
          console.log(
            `\nInvalid input. Please enter a number between 1 and 5.`
          );
         } else {
           // Add selected book to reading list
           readingList.push(book);
           fs.writeFileSync("reading-list.json", JSON.stringify(readingList));
           console.log(
             `\n"${book.volumeInfo.title}" added to your reading list!`
           );
           // Start the application again
           start();
         }
    })
}


// Displays results from book search
function bookSearchResults(books){
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
          "Exit",
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
        // Close the application
        console.log("\nGoodbye!");
      }
    });
}


// Prompts the user to search for a book
function searchQuery(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "query",
          message: "What is the name of the book you are looking for?",
        },
      ])
      .then((search) => {
          // Makes a request to the Google Books API
          apiRequest(search.query, (books) => {
            if(!books){
                console.log(`\nNo books found. Try again.`)
                return searchQuery()
            }
            // Displays results from book search
            bookSearchResults(books);

            let readingList = [];
            // Check if reading list JSON file exists
            if (fs.existsSync("reading-list.json")) {
                readingList = JSON.parse(fs.readFileSync("reading-list.json"));
            }
            // Displays a new menu after results return
            selectionPrompt(books, readingList);
          });

      });
}


// Start the application
function start(){
    let readingList = [];
    // Check if reading list JSON file exists
    if(fs.existsSync('reading-list.json')){
        readingList = JSON.parse(fs.readFileSync("reading-list.json"))
    }

    // Main menu
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["Search for a book", "View my reading list", "Exit"]
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
