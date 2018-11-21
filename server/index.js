const express = require("express");
const cors = require("cors");
const axios = require("axios");
const key = "AIzaSyAXMnnheG9WAL1qaErHO9WVAAkb7DdwCVs";

const {
  getBookshelfError,
  getBookshelf,
  getVolumeInfo,
  findShelfForBook,
  updateBookshelf
} = require("./bookshelf");

const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  const text =
    'Its running!<br>To use the API, please refer to the <strong>Making AJAX Requests</strong> in the <a href="https://docs.google.com/document/d/1FDfNGZ0p0mV_3hUNi_STAbbl4iKF6TkizgT4Ex9n3Kc/edit#">Project Description</a>';
  res.send(text);
});

try {
  app.get("/bookshelf/update/:bookId/:shelf", (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { bookId, shelf } = req.params;
    const volumeInfo = getVolumeInfo(bookId);
    if (!volumeInfo) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => {
          const newVolume = {
            id: response.data.id,
            ...response.data.volumeInfo
          };
          const wasSuccessful = updateBookshelf(newVolume, shelf);
          if (wasSuccessful) {
            const bookshelf = getBookshelf();
            res.send({ books: bookshelf });
          } else {
            console.error(getBookshelfError());
            res.send({
              error: `Error updating your bookshelf for book ${bookId}`
            });
          }
        })
        .catch(e => {
          console.error(e);
          res.send({ error: `Error retreiving book with ID ${bookId}` });
        });
    } else {
      const wasSuccessful = updateBookshelf(volumeInfo, shelf);
      if (wasSuccessful) {
        const bookshelf = getBookshelf();
        res.send({ books: bookshelf });
      } else {
        console.error(getBookshelfError());
        res.send({
          error: `Error updating your bookshelf for book ${bookId}`
        });
      }
    }
  });

  app.get("/bookshelf", (req, res) => {
    const bookshelf = getBookshelf();
    res.setHeader("Content-Type", "application/json");
    res.send({ books: bookshelf });
  });

  app.get("/books/search/:bookTitle", (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { bookTitle } = req.params;
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxAllowedMaturityRating=not-mature&maxResults=20&orderBy=relevance&fields=items(id%2CvolumeInfo)%2CtotalItems`
      )
      .then(response => {
        if (response.data.totalItems === 0) {
          res.send({ books: [] });
        } else {
          const books = response.data.items.map(book => {
            return {
              id: book.id,
              ...book.volumeInfo,
              shelf: findShelfForBook(book.id)
            };
          });
          res.send({ books });
        }
      })
      .catch(e => {
        console.error(e);
        res.send({
          error: `Error searching for books with title ${bookTitle}`
        });
      });
  });

  app.get("/book/:bookId", (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { bookId } = req.params;
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then(response => {
        const newVolume = {
          id: response.data.id,
          ...response.data.volumeInfo,
          shelf: findShelfForBook(response.data.id)
        };
        res.send({ book: newVolume });
      })
      .catch(e => {
        res.send({ error: `No book with book ID ${bookId} found` });
      });
  });
} catch (e) {
  console.error(e);
}

const server = app.listen(7000, () => {
  console.log(
    `\nYour server is running on http://localhost:${server.address().port}/`
  );
  console.log(`\nPress ctrl+c to stop\n`);
});
