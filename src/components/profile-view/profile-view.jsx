import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
	Container,
	Button,
	Card,
	Row,
	Col
} from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
	constructor() {
		super();
		
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthday: null,
			FavoriteMovies: [],
			movies: []
		};
	}
	
	getUser(token) {
		const userId = localStorage.getItem('user');
		
		axios.get(`https://fastflixdb.herokuapp.com/users/${userId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then((res) => {
			this.setState({
				Username: res.data.Username,
				Password: res.data.Password,
				Email: res.data.Email,
				Birthday: res.data.Birthday,
				FavoriteMovies: res.data.FavoriteMovies
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeitem('user');
		window.open('/', '_self');
	}
	
	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		this.getUser(accessToken);
	}
	
	deleteUser() {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		
		axios.delete(`https://fastflixdb.herokuapp.com/users/${userId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(res => {
			alert('Are you sure you want to delete your account?')
		})
		.then(res => {
			alert('Account successfully deleted')
		})
		.then(res => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			
			this.setState({
				user: null
			});
			
			window.open('/', '_self');
		})
		.catch(e => {
			alert('Account could not be deleted ' + e)
		});
	}
	
	deleteFavoriteMovie(movie) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		
		axios.delete(`https://fastflixdb.herokuapp.com/users/${userId}/favorites/${movie._id}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then((res) => {
			console.log(res);
			this.componentDidMount();
		});
	}
	
	render() {
		const { movies } = this.props;
		const userFavoriteMovies = this.state.FavoriteMovies;
		const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));
		
		return (
			<Container>
				<Container>
					<h2 className="profile-title">Your Profile</h2>
					<Card style={{ width: '50rem' }} className="profile-card">
						<Card.Body>
							<Card.Text className='profile-text'>Username: {this.state.Username}</Card.Text>
							<Card.Text className='profile-text'>Email: {this.state.Email}</Card.Text>
							<Card.Text className='profile-text'>Birthday: {this.state.Birthday}</Card.Text>
							<div className='profile-buttons'>
							<Link to={'/users/:userId/update'}>
								<Button variant="success" className='profile-button'>Update Profile</Button>
							</Link>
							<Button variant='danger' onClick={() => this.deleteUser()} className='profile-button'>Delete Profile</Button>
							<Link to={'/'}>
								<Button className='profile-button' variant='secondary'>Go Back</Button>
							</Link>
							</div>
						</Card.Body>
					</Card>
				</Container>
				<Container>
				<h2 className='favorite-movies-title'>Your Favorite Movies</h2>
				{FavoriteMoviesList.map((movie) => {
					return (
						<Card key={movie._id} style={{ width: '15rem' }} className="favorite-movies mt-3 border border-dark rounded">
							<Card.Img className="favorite-movies-images" variant='top' src={movie.ImagePath} width={300} height={400} />
							<Card.Body className="favorites-card">
								<Link to={`/movies/${movie._id}`}>
									<Button variant='link' className='fav-movie-info'>Details</Button>
								</Link>
								<Button variant='link' className='fav-movie-remove' onClick={() => this.deleteFavoriteMovie(movie)}>Remove Movie</Button>
							</Card.Body>
						</Card>
					);
				})}
				</Container>
			</Container>
		);
	}
}

ProfileView.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.instanceOf(Date).isRequired,
		FavoriteMovies: PropTypes.array
	})
}
