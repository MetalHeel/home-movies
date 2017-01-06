import React, { Component } from 'react';
import { Edits, EditForm } from './Edits.js';
import {Storage } from './Storage.js';
import './App.css';


class MovieList extends Component {
  constructor() {
    super();

    this.storage = new Storage();

    var storedMovies = this.storage.getMovies();
    storedMovies = this.sortList(storedMovies);

    this.state = {
      movies: storedMovies,
      editMode: false,
      currentSelection: null
    };

    this.changeSelection = this.changeSelection.bind(this);
  }

  render() {
    var editForm = null;

    if(this.state.editMode)
    {
      editForm = <EditForm
        initialEntries={this.state.currentSelection}
        onSubmit={(title, genre, year, rating) => this.submitForm(title, genre, year, rating)}
        onCancel={() => this.cancelEdit()} />;
    }

    return (
      <div>
        <h1>My Movies</h1>
        <div className="movie-list">
          {this.renderTable()}
        </div>
        <Edits onAdd={() => this.showAddForm()} onDelete={() => this.deleteSelection()} onUpdate={() => this.showEditForm()} />
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

    return this.state.movies.map(function(movie, index) {
      const highlight = { backgroundColor: "yellow" };

      if(selection != null && selection.title.localeCompare(movie.title) === 0)
        return <tr key={movie.title} onClick={() => rowClickCallback(movie)} style={highlight}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
      else
        return <tr key={movie.title} onClick={() => rowClickCallback(movie)}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
    });
  }

  showAddForm() {
    this.setState({
      movies: this.state.movies,
      editMode: true,
      currentSelection: null
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
    if(this.state.currentSelection === null)
      this.addNewMovie(title, genre, year, rating);
    else
      this.updateMovie(title, genre, year, rating);
  }

  cancelEdit() {
    this.setState({
      movies: this.state.movies,
      editMode: false,
      currentSelection: this.state.currentSelection
    });
  }

  addNewMovie(title, genre, year, rating) {
    var newMovie = {
      "title": title,
      "genre": genre,
      "year": year,
      "rating": rating
    };

    var currentMovies = this.state.movies.slice();
    currentMovies.push(newMovie);
    currentMovies = this.sortList(currentMovies);

    this.setState({
      movies: currentMovies,
      editMode: false,
      currentSelection: this.state.currentSelection
    });

    this.storage.addMovie(newMovie);
  }

  updateMovie(title, genre, year, rating) {
    var _ = require('lodash');

    const selection = this.state.currentSelection;

    var oldMovie = selection;
    var newMovie = {
      "title": title,
      "genre": genre,
      "year": year,
      "rating": rating
    };

    var newMovies = _.filter(this.state.movies, function(movie) { return selection === null || selection.title.localeCompare(movie.title) !== 0 });
    newMovies.push(newMovie);
    newMovies = this.sortList(newMovies);

    this.setState({
      movies: newMovies,
      editMode: false,
      currentSelection: null
    });

    this.storage.updateMovie(oldMovie, newMovie);
  }

  changeSelection(selection) {
    if(!this.state.editMode)
    {
      this.setState({
        movies: this.state.movies,
        editMode: this.state.editMode,
        currentSelection: selection
      });
    }
  }

  deleteSelection() {
    var _ = require('lodash');

    const selection = this.state.currentSelection;

    var newMovies = _.filter(this.state.movies, function(movie) { return selection === null || selection.title.localeCompare(movie.title) !== 0 });
    newMovies = this.sortList(newMovies);

    this.setState({
      movies: newMovies,
      editMode: this.state.editMode,
      currentSelection: null
    });

    this.storage.deleteMovie(selection);
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