import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import MovieList from './components/MovieList';
import MovieInfo from './components/MovieInfo';
import Pagination from './components/Pagination';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			searchTerm: '',
			totalResults: 0,
			currentPage: 1,
			currentMovie: null,
		};

		this.searchRef = React.createRef();

		this.apiKey = '2c0752bc5e77d3eb6a1136f896ba0c80';
	}

	componentDidMount() {
		this.getData();
	}

	getData = (type) => {
		let url;
		if (type === 'search') {
			url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.state.searchTerm}`;
		} else {
			url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US`;
		}
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				this.setState({ movies: [...data.results], totalResults: data.total_results });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.getData('search');
		this.setState({ currentPage: 1 });
	};

	handleChange = (e) => {
		this.setState({ searchTerm: e.target.value });
	};

	nextPage = (pageNumber) => {
		let url;
		if (this.state.searchTerm !== '') {
			url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.state.searchTerm}&page=${pageNumber}`;
		} else {
			url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`;
		}
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				this.setState({ movies: [...data.results], currentPage: pageNumber });
			});
	};

	home = () => {
		this.getData();
		this.setState({ searchTerm: '', currentPage: 1 });
		this.searchRef.current.reset();
	};

	viewMovieInfo = (id) => {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=credits`;
    fetch(url)
		.then((data) => data.json())
		.then((data) => {
      this.setState({ currentMovie: data });
		}).catch((e) => {
      this.setState({ currentMovie: null });
    });
	}

	backBtn = () => {
		this.setState({ currentMovie: null });
	}

	render() {
		const numberPage = Math.floor(this.state.totalResults / 20);

		return (
			<div>
				{this.state.currentMovie !== null ? (
					<div className="movie-info">
						<MovieInfo movie={this.state.currentMovie} backBtn={this.backBtn} />
					</div>
				) : (
					<div>
						<div className="row movie-list">
							<MovieList
								ref={this.searchRef}
								movies={this.state.movies}
								handleSubmit={this.handleSubmit}
								handleChange={this.handleChange}
								home={this.home}
								viewMovieInfo={this.viewMovieInfo}
							/>
							{this.state.totalResults > 20 ? (
								<Pagination
									pages={numberPage}
									nextPage={this.nextPage}
									currentPage={this.state.currentPage}
								/>
							) : (
								''
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
