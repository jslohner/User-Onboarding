import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './Form.js';

import axios from 'axios';
import * as yup from 'yup';

const url = 'https://reqres.in/api/users';

const initUserValues = [
	{
		username: '',
		email: '',
		password: '',
		terms: false
	}
]

const initFormValues = {
	username: '',
	email: '',
	password: '',
	terms: false
}

const formSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'Username must have at least 3 characters')
		.required('Username is required'),
	email: yup
		.string()
		.email('Please enter a valid email address')
		.required('Email address is required'),
	password: yup
		.string()
		.min(6, 'Password needs a minimum of 6 characters')
		.required('Password is required'),
	terms: yup
		.boolean()
		.oneOf([true], 'In order to proceed, you must agree to the terms of service by checking the checkbox')
})

function App() {

	const [users, setUsers] = useState(initUserValues);
	const [formValues, setFormValues] = useState(initFormValues);

	const [submitAvailability, setSubmitAvailability] = useState(true);

	const postUser = user => {
		axios.post(url, user)
			.then(res => {
				setUsers([...users, res.data])
			})
			.catch( err => {
				console.log('error');
			})
	}

	const onInputChange = evt => {
		setFormValues({
			...formValues,
			[evt.target.name]: evt.target.value
		});
	}

	const onCheckboxChange = evt => {
		setFormValues({
			...formValues,
			[evt.target.name]: evt.target.checked
		})
	}

	useEffect(() => {
		formSchema.isValid(formValues)
			.then(valid => {
				setSubmitAvailability(!valid)
			})
	}, [formValues])

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
			<Form values={formValues} onInputChange={onInputChange} onCheckboxChange={onCheckboxChange} onSubmit={onSubmit} submitAvailability={submitAvailability}/>
		</div>
	);
}

export default App;
