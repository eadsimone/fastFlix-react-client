import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import {
	Container,
	Row,
	Col,
	Button,
	Nav,
	Navbar
} from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		
		this.state = {
			movies: [],
			user: null
		};
	}
	
	// One of the "hooks" available in a React Component
	componentDidMount() {
		axios.get('https://fastflixdb.herokuapp.com/movies')
		.then(response => {
			this.setState({
				movies: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	}
	
	// Updates state of selectedMovie property to clicked-on movie
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie
		});
	}
	
	// Passes bearer authorization in header of HTTP requests to get all movies
	getMovies(token) {
		axios.get('https://fastflixdb.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => {
			this.setState({
				movies: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	// Updates user property to logged-in user
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username
		});
		
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}
	
	// Logs out user by removing token & user from localStorage
	onLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.open('/', '_self');
	}
	
	render() {
		// Throws on runtime before data is initially loaded/if state isn't initialized
		const { movies, user } = this.state;
		
		// if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
			
		// Before movies have been loaded
		if (!movies) return <div className="main-view" />;
		
		// If state of selectedMovie isn't null, the selected movie will be returned; otherwise, all movies will be returned
		return (
			<Router>
				<div className="main-view">
					<Navbar bg="light" variant="light" expand="lg">
						<Navbar.Brand as={Link} to="/">fastFlix</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link as={Link} to="/">Home</Nav.Link>
								{user && (<div>
									<Nav.Link as={Link} to="/users/:Username">Profile</Nav.Link>
								</div>)}
							</Nav>
							{user && (<div>
								<Button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out-button">Log Out</Button>
							</div>)}
						</Navbar.Collapse>
					</Navbar>
					<Route exact path="/" render={() => {
						if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
						return movies.map(m => <MovieCard key={m._id} movie={m} />
						)
					}} />
					<Route path="/register" render={() => <RegistrationView />} />
					<Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
					<Route path="/directors/:name" render={({ match }) => {
						if (!movies) return <div className="main-view" />;
						return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
					}} />
					<Route path="/genres/:name" render={({ match }) => {
						if (!movies) return <div className="main-view" />;
						return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
					}} />
					<Route exact path="/users/:Username" render={() => <ProfileView movies={movies} />
					} />
					<Route exact path="/users/:Username/update" render={() => <ProfileUpdate movies={movies} />} />
					<Route path="/logout" render={() => <LoginView />} />
				</div>
			</Router>
		)
	}
}
