import React, { Component } from 'react';
import { Edits, EditForm } from './Edits.js'
import './App.css';


class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      editMode: false,
      currentSelection: null
    };
  }

  render() {
    let editForm;

    if(this.state.editMode)
      editForm = <EditForm onSubmit={(title, genre, year, rating) => this.submitForm(title, genre, year, rating)} />;
    else
      editForm = null;

    return (
      <div>
        <h1>My Movies</h1>
        <div className="movie-list">
          {this.renderTable()}
        </div>
        <Edits onAdd={() => this.showEditForm()} />
        {editForm}
      </div>
    );
  }

  renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
    );
  }

  renderBody() {
    return this.state.movies.map(function(movie) {
      return <tr key={movie.title} onClick={() => alert("You hit a row!")}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
    });
  }

  showEditForm() {
    this.setState({
      movies: this.state.movies,
      editMode: true,
      currentSelection: this.state.currentSelection
    });
  }

  submitForm(title, genre, year, rating) {
    var currentMovies = this.state.movies.slice();
    currentMovies.push({
      "title": title,
      "genre": genre,
      "year": year,
      "rating": rating
    });

    // Todo: Create sorting functions for each thing and put 'em in a util file.
    currentMovies.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();

      if(titleA > titleB)
        return 1;

      if(titleA < titleB)
        return -1;

      return 0;
    });

    this.setState({
      movies: currentMovies,
      editMode: false,
      currentSelection: null
    });
  }
}


export default MovieList;