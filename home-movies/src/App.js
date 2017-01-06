import React, { Component } from 'react';
import { Edits, EditForm } from './Edits.js';
import './App.css';


class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      editMode: false,
      currentSelection: null
    };

    this.changeSelection = this.changeSelection.bind(this);
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
        <Edits onAdd={() => this.showEditForm()} onDelete={() => this.deleteSelection()} />
        {editForm}
      </div>
    );
  }

  // Todo: Make scrollable.
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
    const rowClickCallback = this.changeSelection;
    const selection = this.state.currentSelection;

    return this.state.movies.map(function(movie) {
      const highlight = { backgroundColor: "yellow" };

      if(selection != null && selection.localeCompare(movie.title) === 0)
        return <tr key={movie.title} onClick={() => rowClickCallback(movie.title)} style={highlight}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
      else
        return <tr key={movie.title} onClick={() => rowClickCallback(movie.title)}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
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
    currentMovies = this.sortList(currentMovies);

    this.setState({
      movies: currentMovies,
      editMode: false,
      currentSelection: this.state.currentSelection
    });
  }

  changeSelection(selection) {
    this.setState({
      movies: this.state.movies,
      editMode: this.state.editMode,
      currentSelection: selection
    });
  }

  deleteSelection() {
    var _ = require('lodash')

    const selection = this.state.currentSelection;

    var newMovies = _.filter(this.state.movies, function(movie) { return selection === null || selection.localeCompare(movie.title) !== 0 });
    newMovies = this.sortList(newMovies);

    this.setState({
      movies: newMovies,
      editMode: this.state.editMode,
      currentSelection: this.state.currentSelection
    });
  }

  // Todo: Make this a utility with different sorting criteria.
  sortList(list) {
    return list.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();

      if(titleA > titleB)
        return 1;

      if(titleA < titleB)
        return -1;

      return 0;
    });
  }
}


export default MovieList;