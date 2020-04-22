import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './Form.js';

import axios from 'axios';
import * as yup from 'yup';

const url = 'https://reqres.in/api/users';

// const initUserValues = [
// 	{
// 		username: '',
// 		email: '',
// 		password: '',
// 		terms: false
// 	}
// ]

const initFormValues = {
	username: '',
	email: '',
	password: '',
	terms: false
}

const initFormErrors = {
	username: '',
	email: '',
	password: '',
	// terms: ''
}

const formSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(3, 'Username must have at least 3 characters'),
	email: yup
		.string()
		.email('Please enter a valid email address')
		.required('Email address is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password needs a minimum of 6 characters'),
	// terms: yup
	// 	.boolean()
	// 	.required('test')
		// .oneOf([false], 'In order to proceed, you must agree to the terms of service by checking the checkbox')
})

function App() {

	const [users, setUsers] = useState([]);
	const [formValues, setFormValues] = useState(initFormValues);
	const [formErrors, setFormErrors] = useState(initFormErrors);
	const [submitAvailability, setSubmitAvailability] = useState(true);

	const getUsers = () => {
		axios.get(url)
			.then(res => {
				setUsers(res.data);
			})
			.catch(err => {
				console.log('error');
			})
	}

	useEffect(() => {
		getUsers();
	}, [])

	const postUser = user => {
		axios.post(url, user)
			.then(res => {
				setUsers([...users, res.data]);
			})
			.catch(err => {
				console.log('error');
			})
	}

	useEffect(() => {
		formSchema.isValid(formValues)
			.then(valid => {
				setSubmitAvailability(!valid)
			})
	}, [formValues])

	const onInputChange = evt => {

		evt.persist();
		yup
			.reach(formSchema, evt.target.name)
			.validate(evt.target.value)
			.then(valid => {
				setFormErrors({
					...formErrors,
					[evt.target.name]: ''
				});
			})
			.catch(err => {
				setFormErrors({
					...formErrors,
					[evt.target.name]: err.errors[0]
				});
			})

		setFormValues({
			...formValues,
			[evt.target.name]: evt.target.value
		});
	}

	const onCheckboxChange = evt => {
		setFormValues({
			...formValues,
			[evt.target.name]: evt.target.checked
		});
	}

	const onSubmit = evt => {
		evt.preventDefault();

		const newUser = {
			username: formValues.username,
			email: formValues.email,
			password: formValues.password,
			terms: formValues.terms
		}

		postUser(newUser);
		setFormValues(initFormValues);
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>User Onboarding</h1>
			</header>
			<Form values={formValues} onInputChange={onInputChange} onCheckboxChange={onCheckboxChange} onSubmit={onSubmit} submitAvailability={submitAvailability} errors={formErrors}/>
		</div>
	);
}

export default App;
