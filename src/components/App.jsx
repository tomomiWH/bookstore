//import React from "react";
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import NavBar from "./Navbar/Navbar";
import Search from "./Search/Search";
import Bookshelf from "./Bookshelf/Bookshelf";
import BookDetails from "./BookDetails/BookDetails";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="container" />

        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/bookshelf" component={Bookshelf} />
          <Route exact path="/search" component={Search} />
          <Route path="/book/:bookId" component={BookDetails} />
          {/*<Route component={NoMatch} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;
