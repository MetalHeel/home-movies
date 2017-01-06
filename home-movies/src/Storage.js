export class Storage {
	addMovie(movie) {
		var movies = this.getStorage();
		movies.push(movie);

		localStorage.setItem('my-movies', JSON.stringify(movies));
	}

	getMovies() {
		var movies = this.getStorage();

		return movies;
	}

	deleteMovie(movie) {
		var _ = require('lodash');

		var movies = this.getStorage();

		var newMovies = _.filter(movies, function(m) { return movie.title.localeCompare(m.title) !== 0 });

		localStorage.setItem('my-movies', JSON.stringify(newMovies));
	}

	updateMovie(oldMovie, newMovie) {
		var _ = require('lodash')

		var movies = this.getStorage();

		var newMovies = _.filter(movies, function(movie) { return oldMovie.title.localeCompare(movie.title) !== 0 });
	    newMovies.push(newMovie);

	    localStorage.setItem('my-movies', JSON.stringify(newMovies));
	}

	getStorage() {
		let possibleMovies;
		var item = localStorage.getItem('my-movies');

		if(item === null || item.length === 0)
		{
			possibleMovies = [];
			localStorage.setItem('my-movies', "");
		}
		else
			possibleMovies = JSON.parse(item);

		return possibleMovies;
	}
}