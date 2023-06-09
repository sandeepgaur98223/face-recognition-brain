import React from 'react';
import { Component } from 'react';

class Register extends Component{

constructor(props)
{
	super(props);
	this.state={
		REmail:'',
		RPassword:'',
		RName:''
	}
}


onNameChange=(event)=>{
	this.setState({RName: event.target.value});
	}

onEmailChange=(event)=>{
this.setState({REmail: event.target.value});
}

onPasswordChange=(event)=>{
	this.setState({RPassword: event.target.value});
}


onSubmitSignIn=()=>
{
	fetch('https://mybackend-u7da.onrender.com/register',{
		method:'post',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			email:this.state.REmail,
			password:this.state.RPassword,
			name:this.state.RName
		}
		)
	})
	.then(response=>response.json())
	.then(user=>{
		if(user!=='All the fields should be filled')
		{
			this.props.loadUser(user);
			this.props.onRouteChange('home');

		}
		else
		{
			alert('All the fields should be filled!')

		}

	})
	
}


render(){
	return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
		
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset
					  id="sign_up"
					  className="ba b--transparent ph0 mh0">
		
						<legend className="f1 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label
							  className="db fw6 lh-copy f6"
							  htmlFor="name"
							>Name
							</label>
							<input
							  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							  type="text"
							  name="name"
							  id="name"
							  onChange={this.onNameChange}
						/>
						</div>				
						<div className="mt3">
							<label
							  className="db fw6 lh-copy f6"
							  htmlFor="email-address"
							>Email
							</label>
							<input
							  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							  type="email"
							  name="email-address"
							  id="email-address"
							  onChange={this.onEmailChange}
						/>
						</div>
		
						<div className="mv3">
							<label
							  className="db fw6 lh-copy f6"
							  htmlFor="password"
							>
							Password
							</label>
							<input
							  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							  type="password"
							  name="password"
							  id="password"
							  onChange={this.onPasswordChange}
							/>
						</div>
		
					</fieldset>
		
		
					<div className="">
						<input
						  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
						  type="submit"
						  value="Register"
						  onClick={this.onSubmitSignIn}
						/>
					</div>
				</div>
			</main>
		</article>	
				);

}

}

export default Register;


