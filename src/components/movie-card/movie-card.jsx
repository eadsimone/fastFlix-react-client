import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;
		
		return (
			<Card className='movie-card' border='info'>
				<Card.Img className='movie-img' variant='top' src={ movie.ImageURL } />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Subtitle className='text-muted'>{movie.Year}</Card.Subtitle>
					<Button className='more-button' onClick={() => onClick(movie)} variant='info'>More</Button>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string,
		Year: PropTypes.number.isRequired,
		ImageURL: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string,
			Biography: PropTypes.string 
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string,
			Bio: PropTypes.string,
			Birthday: PropTypes.string
	}),
	Featured: PropTypes.bool
}).isRequired,
onClick: PropTypes.func.isRequired
};
