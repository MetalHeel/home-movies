import React, { Component } from 'react';


export class Edits extends Component {
  render() {
    return (
      <div>
        <button className="Add" onClick={() => this.props.onAdd()}>Add</button>
        <button className="Delete" onClick={() => this.props.onDelete()}>Delete</button>
        <button className="Update">Update</button>
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
      rating: 0.0
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  render() {
    return (
      <div>
        <ul>
          <li>Title: <input type="text" name="title" onChange={this.handleTitleChange}></input></li>
          <li>Genre: <input type="text" name="genre" onChange={this.handleGenreChange}></input></li>
          <li>Year: <input type="number" min="0" name="year" onChange={this.handleYearChange}></input></li>
          <li>Rating: <input type="number" min="0" max="10" step="0.1" name="rating" onChange={this.handleRatingChange}></input></li>
        </ul>
        <button className="Submit" onClick={() => this.props.onSubmit(this.state.title, this.state.genre, this.state.year, this.state.rating)}>Submit</button>
      </div>
    );
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