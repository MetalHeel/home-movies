import React, { Component } from 'react';
import './App.css';


// Todo: Add actors.
// Todo: Add some sort of "view" functionality.
// Todo: Update any searches you've done with additions and deletions and whatnot.
export class MovieList extends Component {
  render() {
    return (<div className="movie-list">{this.renderTable()}</div>);
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
    const rowClickCallback = this.props.rowClickCallback;
    const selection = this.props.selection;

    return this.props.movies.map(function(movie, index) {
      const highlight = { backgroundColor: "yellow" };

      if(selection != null && selection.title.localeCompare(movie.title) === 0)
        return <tr key={movie.title} onClick={() => rowClickCallback(movie)} style={highlight}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
      else
        return <tr key={movie.title} onClick={() => rowClickCallback(movie)}><td>{movie.title}</td><td>{movie.genre}</td><td>{movie.year}</td><td>{movie.rating}</td></tr>;
    });
  }
}