import React from 'react';
import Movie from './Movie';
import Search from './Search';

const MovieList = React.forwardRef((props,ref) => {
	const chunk = (arr, size) =>
		Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
	const movies = chunk(props.movies, 4);
	return (
		<div>
			<nav className="navbar navbar-light bg-light fixed-top">
				<div className="container">
					<Search
                        ref={ref}
						handleSubmit={props.handleSubmit}
						handleChange={props.handleChange}
					/>
					<button onClick={props.home} className="navbar-toggler" type="button">
						<i className="fa fa-home"></i>
					</button>
				</div>
			</nav>
			{movies.map((rows, idx) => {
				return <Movie viewMovieInfo={props.viewMovieInfo} rows={rows} key={`box${idx}`} />;
			})}
		</div>
	);
});

export default MovieList;
