import React, { Component } from "react";
import { Link } from "react-router-dom";

function BookshelfCategory(props) {
  return (
    <div>
      <h3 className="h3">{props.shelf}</h3>

      {Object.entries(props.books).map(entry => {
        const [bookKey, book] = entry; //[key, value] in one shot
        //console.log(book);
        const link = "/book/" + book.id;

        if (book.category === props.category) {
          return (
            <div className="col" key={bookKey}>
              <div className="">
                <Link to={link}>
                  <img
                    // test to see if book.imageLinks is there then show thumnails
                    src={book.imageLinks && book.imageLinks.thumbnail}
                    alt=""
                    width="160"
                    height="250"
                  />
                </Link>
                <h5>
                  <Link to={link}>{book.title}</Link>
                </h5>
                <div>
                  <span className="h6">by {book.authors}</span>
                </div>
                <div>
                  <label className="mr-2" htmlFor={book.id}>
                    Change Shelf
                  </label>
                  <select
                    className=""
                    id={book.id}
                    onChange={e => props.move(book.id, e.target.value)}
                  >
                    <option value="wantToRead">Want to Read</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="read">Read</option>
                  </select>
                </div>
                <br />
              </div>
            </div>
          );
        } else return null;
      })}
    </div>
  );
}

class Bookshelf extends Component {
  state = {
    books: []
  };

  move = (id, category) => {
    this.setState({
      books: this.state.books.map(book => {
        if (book.id === id) book.category = category;
        return book;
      })
    });
  };

  render() {
    console.log(this.state.books);
    return (
      <div>
        <h1>Bookshelf Page</h1>
        <div>
          <div>
            <BookshelfCategory
              shelf="Want to Read"
              category="wantToRead"
              books={this.state.books}
              move={this.move}
            />
          </div>
        </div>
        <div>
          <div>
            <BookshelfCategory
              shelf="Currently Reading"
              category="currentlyReading"
              books={this.state.books}
              move={this.move}
            />
          </div>
        </div>
        <div>
          <div>
            <BookshelfCategory
              shelf="Read"
              category="read"
              books={this.state.books}
              move={this.move}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Bookshelf;
