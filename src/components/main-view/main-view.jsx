import React from 'react';
import axios from 'axios';

import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

import {
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'react-bootstrap';

export class MainView extends React.Component {
	constructor() {
		super();
		
		// Initial state set to null
		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
			registered: null,
		};
	}
	
	componentDidMount() {
		axios
			.get ('https://fastflixdb.herokuapp.com/movies')
			.then (response => {
				// Never directly mutate state once define, otherwise component won't update
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	// Invoked when movie is clicked; updates state of selectedMovie property to chosen movie
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie
		});
	}
	
	onRegister(registered) {
		this.setState({
			registered
		});
	}
	
	onLoggedIn(user) {
		this.setState({
			user
		});
	}
	
	onButtonClick() {
		this.setState({
			selectedMovie: null
		});
	}
	
	render() {
		const { movies, selectedMovie, user, registered } = this.state;
		
		if (!registered) return <RegistrationView onRegister={(registered) => this.onRegister(registered)}/>;
		
		if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}/>;
		
		if (!movies) return <div className="main-view"></div>;
		
		return (
			<React.Fragment>
				<div className='main-view'>
					<header>
						<Navbar bg='dark' variant='dark'>
							<Nav className='justify-content-center'>
								<Nav.Item>
									<Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className='logout-button' target='_blank' href='#Home'>Logout</Nav.Link>
								</Nav.Item>
							</Nav>
						</Navbar>
					</header>
					<div className='main-body text-center'>
					{selectedMovie ? (
						<MovieView
						movie={selectedMovie}
						onClick={() => this.onButtonClick()}
					/>
					) : (
						<Container>
							<Row>
								{movies.map((movie) => (
									<Col xs={12} sm={6} md={4} key={movie._id}>
										<MovieCard
										key={movie._id}
										movie={movie}
										onClick={(movie) => this.onMovieClick(movie)}
										/>
									</Col>
								))}
							</Row>
						</Container>
					)}
				</div>
			</React.Fragment>
		);
	}
}
