import React, { Component } from "react";
//import React from "react";

import axios from "axios";

class BookDetails extends Component {
  state = {
    books: [],
    isLoading: true,
    hasError: false
  };

  allBooks = [];

  getBooks = bookId => {
    axios
      .get(`http://localhost:7000/book/${bookId}`)
      .then(response => {
        console.log(response);
        const books = response.data.book;
        this.setState({ books });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false, hasError: true });
      });
  };

  componentDidMount() {
    const bookKey = this.props.match.params.bookId;
    this.getBooks(bookKey);
  }

  render() {
    const book = this.state.books;

    return book ? (
      <div>
        <h2>Book Detail Page</h2>
        <h3>{book.title}</h3>
        <div>
          <img
            // test to see if book.imageLinks is there then show thumnails
            src={book.imageLinks && book.imageLinks.thumbnail}
            alt=""
            width="240"
            height="360"
            className="mb-3"
          />
        </div>
        <p>
          <strong>Author:</strong> {book.authors}
        </p>
        <div>
          <p>{book.description}</p>
        </div>
        <div>
          <p>
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
        </div>
        <div>
          <strong>Category: </strong>
          <p>{book.categories}</p>
        </div>
        <div>
          <strong>Change Shelf:</strong>
        </div>
      </div>
    ) : (
      <div>
        <p>Test</p>
      </div>
    );
  }
}

export default BookDetails;
