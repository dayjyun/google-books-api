import assert from "assert";
import sinon from "sinon";
import bookSearchResults from "../index.js";

describe('bookSearchResults', () => {
    it("Should display the search results from query", () => {
        const searchResults = [
          {
            id: 1,
            volumeInfo: {
              title: "Book One",
              authors: "Author Wright",
              publisher: "Publisher One",
            },
          },
          {
            id: 2,
            volumeInfo: {
              title: "Book Two",
              authors: "Author Penn",
              publisher: "Publisher Two",
            },
          },
          {
            id: 3,
            volumeInfo: {
              title: "Book Three",
              authors: "Author Novel",
              publisher: "Publisher Three",
            },
          },
        ];
        // Check the output
        const spy = sinon.spy(console, "log");
        bookSearchResults(searchResults);
        assert.equal(spy.callCount, 4);
        assert.equal(spy.getCall(0).args[0], "\nResults: ");
        assert.equal(
          spy.getCall(1).args[0],
          '\n1. "Book One" by Author Wright (Publisher One)\n'
        );
        assert.equal(
          spy.getCall(2).args[0],
          '\n2. "Book Two" by Author Penn (Publisher Two)\n'
        );
        assert.equal(
          spy.getCall(3).args[0],
          '\n3. "Book Three" by Author Novel (Publisher Three)\n'
        );
        console.log.restore();
    })
})
