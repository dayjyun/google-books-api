function apiRequest(query, callback) {
  request(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=Your_API_key_here`,
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
