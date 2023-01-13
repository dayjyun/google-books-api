import assert from "assert";
import displayReadingList from "../index.js";
import sinon from 'sinon'

describe("displayReadingList", () => {
  it("should display the reading list", () => {
    const readingList = [
      { id: 1, volumeInfo: { title: "Book One" } },
      { id: 2, volumeInfo: { title: "Book Two" } },
    ];
    // Checks the output
    const spy = sinon.spy(console, "log");
    displayReadingList(readingList);
    assert.equal(spy.callCount, 3);
    assert.equal(spy.getCall(0).args[0], "\nMy Reading List: 2 Books");
    assert.equal(spy.getCall(1).args[0], '\n1. "Book One" by  ()');
    assert.equal(spy.getCall(2).args[0], '\n2. "Book Two" by  ()\n');
    console.log.restore();
  });
});
