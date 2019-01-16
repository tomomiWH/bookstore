import React, { Component } from "react";
//import React from "react";

import axios from "axios";
import "./BookDetails.css";
class BookDetails extends Component {
  state = {
    //do not use books=[],
    isLoading: true,
    hasError: false
  };

  allBooks = [];

  getBooks = bookId => {
    axios
      .get(`http://localhost:7000/book/${bookId}`)
      .then(response => {
        console.log("Details");
        //console.log(response);
        const books = response.data.book;
        this.setState({ books });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false, hasError: true });
      });
  };

  move = (id, category) => {
    console.log(category, id);
    axios
      .get(`http://localhost:7000/bookshelf/update/${id}/${category}`)
      .then(response => {
        //console.log("Here in Search");
        //console.log(response);
        const books = response.data.books;
        console.log(books);
        this.setState({ books: books });
      })
      .catch(error => {
        //console.error(error);
        this.setState({ isLoading: false, hasError: true });
      });
  };

  componentDidMount() {
    const bookKey = this.props.match.params.bookId;
    this.getBooks(bookKey);
  }

  render() {
    const book = this.state.books;
    console.log("book", book);
    return book ? (
      <div class="book-details-display">
        <h4>Book Detail Page</h4>

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
        <h5>{book.title && book.title}</h5>
        <p>
          <strong>Author:</strong> {book.authors && book.authors}
        </p>
        <div>
          <p>{book.description && book.description}</p>
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

        {/* NEEDS to WORK ON - NOT working to display  */}
        {/* <div>
          <strong>Change Shelf:</strong>

          <div>
            {console.log("Default value is read", book.shelf === "read")}
            <select
              defaultValue={book.shelf}
              className=""
              id={book.id}
              onChange={e => this.move(book.id, e.target.value)}
            >
              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="none">none</option>
            </select>
          </div>
        </div> */}
      </div>
    ) : (
      <div />
    );
  }
}

export default BookDetails;
