import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
	Form,
	Button
} from 'react-bootstrap';

import './profile-update.scss';

export function ProfileUpdate(props) {
	const [username, updateUsername] = useState('');
	const [password, updatePassword] = useState('');
	const [email, updateEmail] = useState('');
	const [birthday, updateBirthday] = useState('');
	
	const handleUpdate = (e) => {
		e.preventDefault();
		
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		
		axios.put(`https://fastflixdb.herokuapp.com/users/${userId}`, {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday
		},
		{
			headers: { Authorization: `Bearer ${token}` }
		})
		.then((res) => {
			const data = res.data;
			localStorage.setItem('user', data.Username);
			console.log('Profile updated successfully');
			alert('Your profile has been updated!');
			window.open('/users/userId', '_self');
		})
		.catch(e => {
			console.log('Something went wrong');
			alert('Error while updating profile');
		});
	};
	
	return (
		<div className="profile-update">
			<h2>Update Your fastFlix Profile</h2>
			
			<Form className="update-form">
				<Form.Group controlId="formBasicUsername" className="update-item">
					<Form.Label>Update Username:</Form.Label>
					<Form.Control type="text" value={username} placeholder="New Username" onChange={e => updateUsername(e.target.value)} />
					<Form.Text className="text-muted">Must contain at least eight alphanumeric characters</Form.Text>
				</Form.Group>
				
				<Form.Group controlId="formBasicPassword" className="update-item">
					<Form.Label>Update Password:</Form.Label>
					<Form.Control type="password" value={password} placeholder="New Password" onChange={e => updatePassword(e.target.value)} />
					<Form.Text className="text-muted">Must contain at least eight alphanumeric characters</Form.Text>
				</Form.Group>
				
				<Form.Group controlId="formBasicEmail" className="update-item">
					<Form.Label>Update Email:</Form.Label>
					<Form.Control type="email" value={email} placeholder="New Email Address" onChange={e => updateEmail(e.target.value)} />
				</Form.Group>
				
				<Form.Group controlId="formBasicBirthday" className="update-item">
					<Form.Label>Update Birthday:</Form.Label>
					<Form.Control type="date" value={birthday} placeholder="New Birthday" onChange={e => updateBirthday(e.target.value)} />
				</Form.Group>
			</Form>
			
			<div className="profile-update-buttons">
				<Button type="submit" variant="success" onClick={handleUpdate}>Update</Button>
				<Link to={"/users/:userId"}>
					<Button variant="secondary">Cancel</Button>
				</Link>
			</div>
		</div>
	);
}

ProfileUpdate.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.instanceOf(Date).isRequired
	})
}
