import React from 'react';

function Form(props) {
	return (
		<form className='form'>
			<h2>New User</h2>
			<label>Name: <input name='name' type='text'/></label>
			<label>Email: <input name='email' type='text'/></label>
			<label>Password: <input name='password' type='text'/></label>
			<label><input name='terms' type='checkbox'/>Terms of Service</label>
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
