import React, { Component } from 'react';


export class Edits extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: null
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  render() {
    return (
      <div>
        <button className="Add" onClick={() => this.props.onAdd()}>Add</button>
        <button className="Delete" onClick={() => this.props.onDelete()}>Delete</button>
        <button className="Update" onClick={() => this.props.onUpdate()}>Update</button>
        <button className="View" onClick={() => this.props.onView()}>View</button>
        <div className="SearchBar">
          <input type="text" onChange={this.handleSearchChange} />
          <button className="Search" onClick={() => this.props.onSearch(this.state.searchQuery)}>Search</button>
          <button className="Reset" onClick={() => this.props.onReset()}>Reset</button>
        </div>
      </div>
    );
  }

  handleSearchChange(e) {
    this.state = {
      searchQuery: e.target.value
    };
  }
}

export class EditForm extends Component {
  constructor() {
    super();

    this.state = {
      title: null,
      genre: null,
      year: null,
      rating: null,
      newActor: null,
      actors: []
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleActorChange = this.handleActorChange.bind(this);
  }

  render() {
    var title = "";
    var genre = "";
    var year = 1900;
    var rating = 1;
    var actors = []

    if(this.props.initialEntries !== null)
    {
      title = this.props.initialEntries.title;
      genre = this.props.initialEntries.genre;
      year = this.props.initialEntries.year;
      rating = this.props.initialEntries.rating;
      actors = this.props.initialEntries.actors;
    }

    // For some reason I can't get the props in the constructor?  Also, this works??
    this.refreshState(title, genre, year, rating, actors);

    // Todo: Input areas are not aligned.
    return (
      <div>
        <div>
          <ul>
            <li>Title: <input type="text" name="title" onChange={this.handleTitleChange} defaultValue={title} /></li>
            <li>Genre: <input type="text" name="genre" onChange={this.handleGenreChange} defaultValue={genre} /></li>
            <li>Year: <input type="number" min="0" name="year" onChange={this.handleYearChange} defaultValue={year} /></li>
            <li>Rating: <input type="number" min="0" max="10" step="0.1" name="rating" onChange={this.handleRatingChange} defaultValue={rating} /></li>
          </ul>
        </div>
        <div className="AddActor">
          <div><label>Actors</label></div>
          <input type="text" name="newActor" onChange={this.handleActorChange} />
          <button className="Add" onClick={() => this.addActor()}>Add</button>
        </div>
        <div>
          {this.renderActors(actors)}
        </div>
        <button className="Submit" onClick={() => this.props.onSubmit(this.state.title, this.state.genre, this.state.year, this.state.rating, this.state.actors)}>Submit</button>
        <button className="Cancel" onClick={() => this.props.onCancel()}>Cancel</button>
      </div>
    );
  }

  renderActors() {
    var _ = require('lodash');
    var display = "";

    _.forEach(this.state.actors, function(actor) {
      display += actor + "\n";
    });

    return <textarea rows="6" cols="31" disabled value={display} />;
  }

  refreshState(title, genre, year, rating, actors) {
    var oldState = this.state;

    if(oldState.title === null)
      oldState.title = title;
    if(oldState.genre === null)
      oldState.genre = genre;
    if(oldState.year === null)
      oldState.year = year;
    if(oldState.rating === null)
      oldState.rating = rating;
    if(oldState.actors.length === 0 && actors.length > 0)
      oldState.actors = actors;
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      genre: this.state.genre,
      year: this.state.year,
      rating: this.state.rating,
      newActor: this.state.newActor,
      actors: this.state.actors
    });
  }

  handleGenreChange(e) {
    this.setState({
      title: this.state.title,
      genre: e.target.value,
      year: this.state.year,
      rating: this.state.rating,
      newActor: this.state.newActor,
      actors: this.state.actors
    });
  }

  handleYearChange(e) {
    this.setState({
      title: this.state.title,
      genre: this.state.genre,
      year: e.target.value,
      rating: this.state.rating,
      newActor: this.state.newActor,
      actors: this.state.actors
    });
  }

  handleRatingChange(e) {
    this.setState({
      title: this.state.title,
      genre: this.state.genre,
      year: this.state.year,
      rating: e.target.value,
      newActor: this.state.newActor,
      actors: this.state.actors
    });
  }

  handleActorChange(e) {
    this.setState({
      title: this.state.title,
      genre: this.state.genre,
      year: this.state.year,
      rating: this.state.rating,
      newActor: e.target.value,
      actors: this.state.actors
    });
  }

  // Todo: Delete actors.
  addActor() {
    if(this.state.newActor !== null)
    {
      var newActors = this.state.actors.slice();
      newActors.push(this.state.newActor);

      this.setState({
        title: this.state.title,
        genre: this.state.genre,
        year: this.state.year,
        rating: this.state.rating,
        newActor: null,
        actors: newActors
      });
    }
  }
}