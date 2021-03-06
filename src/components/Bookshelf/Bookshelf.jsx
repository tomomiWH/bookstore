import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Bookshelf.css";

function BookshelfCategory(props) {
  return (
    <div>
      <h4 className="h3">{props.shelf}</h4>

      {Object.entries(props.books).map(entry => {
        const [bookKey, book] = entry; //[key, value] in one shot
        const link = "/book/" + book.id;
        //const linkUpdate = "/update/" + book.id + "/" + book.category;

        //console.log(bookKey);
        return (
          <div className="col" key={bookKey}>
            <div className="bookshelf-list">
              <Link to={link}>
                <img
                  // test to see if book.imageLinks is there then show thumnails
                  src={book.imageLinks && book.imageLinks.thumbnail}
                  alt=""
                  width="160"
                  height="200"
                />
              </Link>
              <h5>
                <Link to={link}>{book.title && book.title}</Link>
              </h5>
              <div>
                <span className="h6"> {book.authors && book.authors}</span>
              </div>
              <div>
                <label className="mr-2" htmlFor={book.id}>
                  Change Shelf
                </label>
                <select
                  defaultValue={props.category}
                  className=""
                  id={book.id}
                  onChange={e => props.move(book.id, e.target.value)}
                >
                  <option value="wantToRead">Want to Read</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read">Read</option>
                  <option value="none">none</option>
                </select>
              </div>
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
}

class Bookshelf extends Component {
  state = {
    books: [],
    isLoading: true,
    hasError: false
  };

  allBooks = [];

  getBooks = (bookId, category) => {
    axios
      .get(`http://localhost:7000/bookshelf`)
      .then(response => {
        const books = response.data.books;
        this.setState({ books }, () => console.log("in get books", this.state));
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false, hasError: true });
      });
  };

  move = (id, category) => {
    axios
      .get(`http://localhost:7000/bookshelf/update/${id}/${category}`)
      .then(response => {
        //console.log("Here in Search");
        //console.log(response);
        const books = response.data.books;

        this.setState({ books: books });
      })
      .catch(error => {
        //console.error(error);
        this.setState({ isLoading: false, hasError: true });
      });
  };

  componentDidMount() {
    const bookId = this.props.match.bookId;
    const bookCategory = this.props.match.category;
    this.getBooks();
  }

  render() {
    console.log(this.state);
    return (
      <div className="bookshelf-display">
        <div className="">
          {this.state.books.wantToRead &&
            this.state.books.wantToRead.length > 0 && (
              <div>
                <BookshelfCategory
                  shelf="Want to Read"
                  category="wantToRead"
                  books={this.state.books.wantToRead}
                  move={this.move}
                />
              </div>
            )}
        </div>
        <div>
          {this.state.books.currentlyReading &&
            this.state.books.currentlyReading.length > 0 && (
              <div>
                <BookshelfCategory
                  shelf="Currently Reading"
                  category="currentlyReading"
                  books={this.state.books.currentlyReading}
                  move={this.move}
                />
              </div>
            )}
        </div>
        <div>
          {this.state.books.read && this.state.books.read.length > 0 && (
            <div>
              <BookshelfCategory
                shelf="Read"
                category="read"
                books={this.state.books.read}
                move={this.move}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Bookshelf;
