// Todo: Ascending/Descending.
export class SortMaster {
	sortByTitle(list) {
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

	sortByGenre(list) {
		return list.sort(function(a, b) {
			var genreA = a.genre.toUpperCase();
			var genreB = b.genre.toUpperCase();

			if(genreA > genreB)
				return 1;

			if(genreA < genreB)
				return -1;

			return 0;
		});
	}

	sortByYear(list) {
		return list.sort(function(a, b) {
			var yearA = a.year;
			var yearB = b.year;

			if(yearA > yearB)
				return 1;

			if(yearA < yearB)
				return -1;

			return 0;
		});
	}

	sortByRating(list) {
		return list.sort(function(a, b) {
			var ratingA = a.rating;
			var ratingB = b.rating;

			if(ratingA > ratingB)
				return 1;

			if(ratingA < ratingB)
				return -1;

			return 0;
		});
	}
}