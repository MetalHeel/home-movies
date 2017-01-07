import React, { Component } from 'react';

import { Edits, EditForm } from './Edits.js';
import { MovieList } from './MovieList';
import { Storage } from './Storage.js';
import { SortMaster } from './SortMaster.js';

import './App.css';


class App extends Component {
  constructor() {
    super();

    this.Modes = {
      STANDARD: 0,
      ADD: 1,
      UPDATE: 2,
      VIEW: 3
    };

    this.storage = new Storage();
    this.sortMaster = new SortMaster()

    // Todo: Sort by clicked header.
    var storedMovies = this.storage.getMovies();
    storedMovies = this.sortMaster.sortByTitle(storedMovies);

    this.state = {
      allMovies: storedMovies,
      currentMovies: storedMovies,
      mode: this.Modes.STANDARD,
      currentSelection: null
    };
  }

  render() {
    var editForm = null;

    if(this.state.mode === this.Modes.UPDATE || this.state.mode === this.Modes.ADD)
    {
      editForm = <EditForm
        initialEntries={this.state.currentSelection}
        onSubmit={(title, genre, year, rating) => this.submitForm(title, genre, year, rating)}
        onCancel={() => this.cancelEdit()} />;
    }

    return (
      <div>
        <h1>My Movies</h1>
        <MovieList movies={this.state.currentMovies}
          selection={this.state.currentSelection}
          rowClickCallback={(selection) => this.changeSelection(selection)} />
        <Edits onAdd={() => this.showAddForm()}
          onDelete={() => this.deleteSelection()}
          onUpdate={() => this.showEditForm()}
          onSearch={(query) => this.searchList(query)}
          onReset={() => this.loadAll()} />
        {editForm}
      </div>
    );
  }

  showAddForm() {
    this.setState({
      allMovies: this.state.allMovies,
      currentMovies: this.state.currentMovies,
      mode: this.Modes.ADD,
      currentSelection: null
    });
  }

  showEditForm() {
    this.setState({
      allMovies: this.state.allMovies,
      currentMovies: this.state.currentMovies,
      mode: this.Modes.UPDATE,
      currentSelection: this.state.currentSelection
    });
  }

  cancelEdit() {
    this.setState({
      allMovies: this.state.allMovies,
      currentMovies: this.state.currentMovies,
      mode: this.Modes.STANDARD,
      currentSelection: this.state.currentSelection
    });
  }

  submitForm(title, genre, year, rating) {
    if(this.state.currentSelection === null)
      this.addNewMovie(title, genre, year, rating);
    else
      this.updateMovie(title, genre, year, rating);
  }

  deleteSelection() {
    var _ = require('lodash');

    const selection = this.state.currentSelection;

    var newMovies = _.filter(this.state.allMovies, function(movie) { return selection === null || selection.title.localeCompare(movie.title) !== 0 });
    newMovies = this.sortMaster.sortByTitle(newMovies);

    this.setState({
      allMovies: newMovies,
      currentMovies: newMovies,
      mode: this.state.mode,
      currentSelection: null
    });

    this.storage.deleteMovie(selection);
  }

  // Todo: This will need to be expanded for artists.
  searchList(query) {
    var _ = require('lodash');

    var generalQuery = query.toUpperCase();

    var hits = _.filter(this.state.allMovies, function(movie) {
      return _.some(movie, function(value) {
        if(value.toUpperCase().indexOf(generalQuery) !== -1)
          return true;

        return false;
      });
    });

    this.setState({
      allMovies: this.state.allMovies,
      currentMovies: hits,
      mode: this.state.mode,
      currentSelection: null
    });
  }

  loadAll() {
    var storedMovies = this.storage.getMovies();
    storedMovies = this.sortMaster.sortByTitle(storedMovies);

    this.setState({
      allMovies: storedMovies,
      currentMovies: storedMovies,
      mode: this.Modes.STANDARD,
      currentSelection: null
    });
  }

  addNewMovie(title, genre, year, rating) {
    var newMovie = {
      "title": title,
      "genre": genre,
      "year": year,
      "rating": rating
    };

    var newMovies = this.state.allMovies.slice();
    newMovies.push(newMovie);
    newMovies = this.sortMaster.sortByTitle(newMovies);

    this.setState({
      allMovies: newMovies,
      currentMovies: newMovies,
      mode: this.Modes.STANDARD,
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

    var newMovies = _.filter(this.state.allMovies, function(movie) { return selection === null || selection.title.localeCompare(movie.title) !== 0 });
    newMovies.push(newMovie);
    newMovies = this.sortMaster.sortByTitle(newMovies);

    this.setState({
      allMovies: newMovies,
      currentMovies: newMovies,
      mode: this.Modes.STANDARD,
      currentSelection: null
    });

    this.storage.updateMovie(oldMovie, newMovie);
  }

  changeSelection(selection) {
    if(this.state.mode === this.Modes.STANDARD || this.state.mode === this.Modes.VIEW)
    {
      this.setState({
        allMovies: this.state.allMovies,
        mode: this.state.mode,
        currentSelection: selection
      });
    }
  }
}


export default App;