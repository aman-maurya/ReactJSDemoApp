import React from 'react';

const MovieInfo = props => {
    const movieYear = (date) => {
        let d = new Date(date);
        return d.getFullYear();
    }
    const movieLenght = (num) => {
		let hours = num / 60;
		let rhours = Math.floor(hours);
		let minutes = (hours - rhours) * 60;
		let rminutes = Math.round(minutes);
		return `${rhours} hour(s) ${rminutes} minute(s) `;
	};
    const image = (img) => {
		if (img) {
			return `https://image.tmdb.org/t/p/w220_and_h330_face${img}`;
		} else {
			return `https://dummyimage.com/220x330/dbdbdb/030303.jpg&text=No+Image`;
		}
    };
    
    const director = (list) => {
        let val = "Unknown";
        list.map((row, i) => {
			if (row.job === 'Director') {
				val = row.name;
			}
        });
        
        return val;
    };
    const casts = (list) => {
        let cast = [];
        list.map((row,i) => {
            if (row.character != '' || row.character != null){ 
                cast.push(`${row.name} (${row.character})`);
            }
        })

        return cast.join(',');
    };

	return (
		<div>
			<nav className="navbar navbar-light bg-light fixed-top">
				<div className="container">
					<a className="navbar-brand" href="#">
						Movie Detail
					</a>
					<button onClick={props.backBtn} className="navbar-toggler" type="button">
						<i className="fa fa-arrow-left"></i>
					</button>
				</div>
			</nav>
			<div className="movie-list">
				<div className="row">
					<div className="col-md-3">
						<img className="card-img-top" src={image(props.movie.poster_path)} alt="" />
					</div>
					<div className="col-md-9">
						<h3>
							{props.movie.title}
							<small style={{ fontWeight: 'normal', fontSize: 15 }}> ({props.movie.vote_average})</small>
						</h3>
						<p>
							{movieYear(props.movie.release_date)} | {movieLenght(props.movie.runtime)} | {director(props.movie.credits.crew)}
						</p>
						<p>Cast : {casts(props.movie.credits.cast)}</p>
						<p>{props.movie.overview}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieInfo