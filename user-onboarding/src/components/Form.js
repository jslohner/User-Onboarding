import React from 'react';
import './App.css';

function Form(props) {
	const {
		values,
		onInputChange,
		onCheckboxChange,
		onSubmit,
		submitAvailability,
		errors
	} = props;
	return (
		<form className='form'>
			<h2>New User</h2>
			<div>
				{<p>{errors.username}</p>}
				{<p>{errors.email}</p>}
				{<p>{errors.password}</p>}
			</div>
			<label>Username: <input value={values.username} onChange={onInputChange} name='username' type='text'/></label>
			<label>Email: <input value={values.email} onChange={onInputChange} name='email' type='text'/></label>
			<label>Password: <input value={values.password} onChange={onInputChange} name='password' type='text'/></label>
			<label><input checked={values.terms} onChange={onCheckboxChange} name='terms' type='checkbox'/>Terms of Service</label>
			<button onClick={onSubmit} disabled={submitAvailability}>Submit</button>
		</form>
	);
}

export default Form;

// - [ ] A Submit button to send our form data to the server.
