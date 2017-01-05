import React, { Component } from 'react';
import './App.css';


class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: Array,
      addMode: false
    };
  }

  render() {
    let addForm;

    if(this.state.addMode)
      addForm = <AddForm onSubmit={() => this.submitForm()} />;
    else
      addForm = null;

    return  (
      <div>
        <h1>My Movies</h1>
        <div className="movie-list">
          {this.renderTable()}
        </div>
        <AddDeleteUpdate onAdd={() => this.showAddForm()} />
        {addForm}
      </div>
    );
  }

  renderTable() {
    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Rating</th>
        </tr>
      </table>
    );
  }

  showAddForm() {
    this.setState({
      movies: Array,
      addMode: true
    });
  }

  submitForm() {
    this.setState({
      movies: Array,
      addMode: false
    });
  }
}

class AddDeleteUpdate extends Component {
  render() {
    return (
      <div>
        <button className="Add" onClick={() => this.props.onAdd()}>Add</button>
        <button className="Delete">Delete</button>
        <button className="Update">Update</button>
      </div>
    );
  }
}

class AddForm extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Title: <input type="text" name="title">{this.props.title}</input></li>
          <li>Genre: <input type="text" name="genre">{this.props.genre}</input></li>
          <li>Year: <input type="text" name="year">{this.props.year}</input></li>
          <li>Rating: <input type="number" min="0" step="0.1" name="rating">{this.props.rating}</input></li>
        </ul>
        <button className="Submit" onClick={() => this.props.onSubmit()}>Submit</button>
      </div>
    );
  }
}


export default MovieList;