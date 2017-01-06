import React, { Component } from 'react';


export class Edits extends Component {
  render() {
    return (
      <div>
        <button className="Add" onClick={() => this.props.onAdd()}>Add</button>
        <button className="Delete" onClick={() => this.props.onDelete()}>Delete</button>
        <button className="Update" onClick={() => this.props.onUpdate()}>Update</button>
      </div>
    );
  }
}

export class EditForm extends Component {
  constructor() {
    super();

    this.state = {
      title: null,
      genre: null,
      year: null,
      rating: null
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  render() {
    var title = "";
    var genre = "";
    var year = 1900;
    var rating = 1;

    if(this.props.initialEntries !== null)
    {
      title = this.props.initialEntries.title;
      genre = this.props.initialEntries.genre;
      year = this.props.initialEntries.year;
      rating = this.props.initialEntries.rating;
    }

    // For some reason I can't get the props in the constructor?
    this.refreshState(title, genre, year, rating);

    // Todo: Input areas are not aligned.
    return (
      <div>
        <ul>
          <li>Title: <input type="text" name="title" onChange={this.handleTitleChange} defaultValue={title} /></li>
          <li>Genre: <input type="text" name="genre" onChange={this.handleGenreChange} defaultValue={genre} /></li>
          <li>Year: <input type="number" min="0" name="year" onChange={this.handleYearChange} defaultValue={year} /></li>
          <li>Rating: <input type="number" min="0" max="10" step="0.1" name="rating" onChange={this.handleRatingChange} defaultValue={rating} /></li>
        </ul>
        <button className="Submit" onClick={() => this.props.onSubmit(this.state.title, this.state.genre, this.state.year, this.state.rating)}>Submit</button>
        <button className="Cancel" onClick={() => this.props.onCancel()}>Cancel</button>
      </div>
    );
  }

  refreshState(title, genre, year, rating) {
    var oldState = this.state;

    if(oldState.title === null)
      oldState.title = title;
    if(oldState.genre === null)
      oldState.genre = genre;
    if(oldState.year === null)
      oldState.year = year;
    if(oldState.rating === rating)
      oldState.rating = rating;
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      genre: this.state.genre,
      year: this.state.year,
      rating: this.state.rating
    });
  }

  handleGenreChange(e) {
    this.setState({
      title: this.state.title,
      genre: e.target.value,
      year: this.state.year,
      rating: this.state.rating
    });
  }

  handleYearChange(e) {
    this.setState({
      title: this.state.title,
      genre: this.state.genre,
      year: e.target.value,
      rating: this.state.rating
    });
  }

  handleRatingChange(e) {
    this.setState({
      title: this.state.title,
      genre: this.state.genre,
      year: this.state.year,
      rating: e.target.value
    });
  }
}