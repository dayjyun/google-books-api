### Google Books API
Who needs a fancy GUI when you can do all your searches directly from the command line?
Feel like a real hacker from the comfort of your command line by interacting with the terminal just like in the movies! (Except you'll be searching through Google's list of books rather than saving the world from evildoers).

## How To Run
To use with JavaScript, simply type `node index.js` from the folder's root directory, and you're on your way to your reading adventure.


## Code
Throughout the code, there are many callbacks being used within functions. This is to follow the *DRY* method, in order to avoid repetition and to maintain seamless functionality with each request.

When you first start the application, you will notice there are three menu options listed for you
`"Search for a book"`, `"View my reading list"`, and `"Exit"`.

As you begin your searches, you will notice that the menu slightly changes to include a fourth option `Add book to my reading list`. Selecting this option will then ask you to enter a number that corresponds to the book. This makes the experience far more user-friendly rather than typing out the entire name of the book.

## Edge Cases
- No books result
    - You'll see a message stating no books were found if no results are returned from your search.

- Entering invalid book number
    - Books results are displayed numbered from 1 - 5. In order to add a book, you must select the number next to the book you wish to add. If you enter an invalid number, it will respond with an error, and prompt you to try again.

- Book already exists in your list
    - This helps avoid adding multiple books that already exist in your library.

- Empty reading list
    - Shows an `EMPTY` message within the list stating there are no books in the reading list. Also, the reading list displays a number with the amount of books currently on your list for better visual feedback.

## Experience
One of the more difficult challenges with this project was learning how to create a command line application. Searching through the internet to find adequate information about how to set up an application for the console isn't quite as popular as database rendering or frontend development.

On top of that, having no experience using the Google Books API system before added pressure to figuring things out fast. As soon as I managed to find a quality source, it was time for me to get coding.

The next challenge was the approach. Considering that I needed to return and store a list of books, I knew I needed to store my data somehow without creating a database. During my hunt trying to figure out how to create a command line application, I stumbled upon saving data locally as a JSON file. So I went back searching through my history until I found the method to hit the ground

The main objective that I had while working on the project was to treat it as a video game. I would ask myself 'if this were a video game, what outputs would I want to see?', and from that point, I made sure to make every output interactive leaving the 'player' with options for new actions to take. Once that was figured out, it was pretty fun making up my own game.
