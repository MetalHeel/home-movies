import React, { Component } from 'react';


export class View extends Component {
	render() {
		var title = "";
		var genre = "";
		var year = 1900;
		var rating = 0;
		var actors = [];

		if(this.props.movie !== null)
		{
			title = this.props.movie.title;
			genre = this.props.movie.genre;
			year = this.props.movie.year;
			rating = this.props.movie.rating;
		}

		// Todo: These are not aligned.
		return (
			<div>
				<ul>
					<li>Title: {title}</li>
					<li>Genre: {genre}</li>
					<li>Year: {year}</li>
					<li>Rating: {rating}</li>
				</ul>
				<div>Actors</div>
				<ul>{this.renderActors(actors)}</ul>
			</div>
		);
	}
	
	// Todo: Alphabatize actors.
	renderActors(actors) {
	    return this.props.movie.actors.map(function(actor, index) {
	    	return <li key={index}>{actor}</li>;
	    });
	}
}