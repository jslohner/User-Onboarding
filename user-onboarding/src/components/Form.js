import React from 'react';
import './App.css';

function Form(props) {
	const {
		values,
		onInputChange,
		onCheckboxChange
	} = props;
	return (
		<form className='form'>
			<h2>New User</h2>
			<label>Name: <input value={values.username} onChange={onInputChange} name='username' type='text'/></label>
			<label>Email: <input value={values.email} onChange={onInputChange} name='email' type='text'/></label>
			<label>Password: <input value={values.password} onChange={onInputChange} name='password' type='text'/></label>
			<label><input checked={values.terms} onChange={onCheckboxChange} name='terms' type='checkbox'/>Terms of Service</label>
			<button>Submit</button>
		</form>
	);
}

export default Form;
//
// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.
