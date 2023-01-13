// const assert = require('chai').assert;
// const index = require('../index');

import assert from "assert";
import addToReadingList from "../index.js";

describe('addToReadingList', () => {
    // length of reading list should increase by 1 when book is added
    // it('Should add a book to the reading list', () => {
    //     let readingList = []
    //     let searchQuery = [{id: 1, volumeInfo: {title: "Book One", authors: "Author Wright", publisher: "Prestigious Publishing"}}]
    //     assert.equal(addToReadingList(searchQuery))
    //     assert.equal(readingList.length, 1)
    // });

    // book should not be added if the input is not a number between 1 and 5
    it('Should not add a book if the input is not a number between 1 and 5', () => {
        let readingList = []
        let searchQuery = [{id: 6, volumeInfo: {title: "Book One", authors: "Author Wright", publisher: "Prestigious Publishing"}}]
        addToReadingList(searchQuery, readingList);
        assert.equal(readingList.length, 0)
    });

    // book should not be added if the input is not a number
    it('Should not add a book if the input is not a number', () => {
        let readingList = []
        let searchQuery = [{id: 'a!s@', volumeInfo: {title: "Book One", authors: "Author Wright", publisher: "Prestigious Publishing"}}]
        addToReadingList(searchQuery, readingList);
        assert.equal(readingList.length, 0)
    });
})
