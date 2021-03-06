import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";
//search for books
//const urlsearch = "http://localhost:7000/books/search/${`userInput`}";

class Search extends Component {
  state = {
    books: [],
    isLoading: true,
    hasError: false
  };

  allBooks = [];

  getBooks() {}

  searchBooks = userInput => {
    const input = userInput.toLowerCase();
    axios
      .get(`http://localhost:7000/books/search/${userInput}`)
      .then(response => {
        //console.log("Here in Search");
        //console.log(response);
        const books = response.data.books;
        this.setState({ books });
      })
      .catch(error => {
        //console.error(error);
        this.setState({ isLoading: false, hasError: true });
      });
    this.setState(
      {
        books: this.allBooks.filter(book => {
          const booktitle = book.booktitle.title;
          return booktitle.match(input);
        })
      },
      () => console.log("in search state")
    );
  };

  componentDidMount() {
    //this.getBooks();
  }
  handleSubmission = e => {
    e.preventDefault();
  };

  render() {
    //console.log(this.state);
    return (
      <div className="search-display">
        <form
          onSubmit={this.onSubmit}
          //onChange={e => this.searchBooks(e.target.value)}
          className="form-inline active-cyan-3 active-cyan-4 mb-4"
        >
          <i className="fa fa-search" aria-hidden="true" />
          <input
            className="form-control form-control-sm ml-3 w-75 input-box"
            type="text"
            placeholder="Search books.."
            aria-label="Search"
            //ref={}
            onChange={e => this.searchBooks(e.target.value)}
          />
        </form>

        <div>
          {Object.entries(this.state.books).map(entry => {
            const [bookKey, book] = entry; //[key, value] in one shot
            // console.log(book);
            const link = "/book/" + book.id;
            return (
              <div className="col" key={bookKey}>
                <div className="search-result-display">
                  <Link to={link}>
                    <img
                      // test to see if book.imageLinks is there then show thumnails
                      src={book.imageLinks && book.imageLinks.thumbnail}
                      alt=""
                      width="160"
                      height="190"
                    />
                  </Link>
                  <h5>
                    <Link to={link}>{book.title && book.title}</Link>
                  </h5>
                  <div>
                    <span className="h6">{book.authors && book.authors}</span>
                  </div>
                  <br />
                </div>
              </div>
            );
          })}

          {/* {this.state.books.map((book, index) => {
            console.log(book);
            const key = "Book -" + index;
            const title = book.title;
            return (
              <div className="card" key={key}>
                <div className="card-section media-object">
                  <div className="thumbnail">
                    <a href={book.title} className="h6">
                      <img
                        src={book.imageLinks && book.imageLinks.thumbnail}
                        alt=""
                      />
                    </a>`
                  </div>
                  <div className="media-object-section align-self-middle">
                    <div>
                      <a href={book.title} className="h6">
                        {book.title}
                      </a>
                      <br />
                      <span className="h6">{book.authors}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}
export default Search;
