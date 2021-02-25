import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	// Allows for random credentials; no user functionality yet
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		
		// Send a request to the server for authentication, then call props.onLoggedIn(username)
		props.onLoggedIn(username);
	};
	
	return (
		<div>
			<Form className='login-form'>
				<h1 className='login-header'>Log in:</h1>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Your username here!'
					/>
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Your password here!'
					/>
				</Form.Group>
				<Button onClick={handleSubmit} variant='dark' type='submit'>Submit</Button>
			</Form>
		</div>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired
	}),
	onLoggedIn: PropTypes.func.isRequired,
	onRegister: PropTypes.func
};
