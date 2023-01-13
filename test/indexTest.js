// const assert = require('chai').assert;
// const index = require('../index');

import assert from "assert";
import addToReadingList from "../index.js";

describe('addToReadingList', () => {
    it('Should add a book to the reading list', () => {
        // length of reading list should increase by 1
        // book should be added to the reading list
        // book should not be added if it is already in the reading list
        // book should not be added if the input is not a number between 1 and 5
        let readingList = []
        let searchQuery = [{id: 1, volumeInfo: {title: "The Hobbit", authors: "J.R.R. Tolkien", publisher: "Allen & Unwin"}}]
        assert.equal(addToReadingList(searchQuery))
        assert.equal(readingList.length, 1)
    })
})
