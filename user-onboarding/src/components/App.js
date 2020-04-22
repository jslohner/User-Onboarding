import React, { useState } from 'react';
import './App.css';

import Form from './Form.js';

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

function App() {

	const [users, setUsers] = useState(initUserValues);
	const [formValues, setFormValues] = useState(initFormValues);

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

	const onSubmit = evt => {

	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>User Onboarding</h1>
			</header>
			<Form values={formValues} onInputChange={onInputChange} onCheckboxChange={onCheckboxChange}/>
		</div>
	);
}

export default App;

// Submit
// input change
// checkbox change
