// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'

// CSS
import './RegisterPage.css'

// Constants

// Actions
import { registerAction } from '../../core/register'

class RegisterPage extends Component {
	static propTypes = {
	}

	constructor(props) {
		super(props)
		this.state = {email: "", password: "", name: "", rePassword: ''}
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	register(e) {
		e.preventDefault()
		const {email, password, name, rePassword} = this.state;
		const {register, router, notifyError} = this.props;
		if(password !== rePassword) {
			notifyError("the password must be match the re-enter password")
		} else {
			
			register(email, password, name, router);
		}
		
	}

	handleKeyDown(e) {
		if (e.key === 'Enter') {
		  this.register(e);
		}
	}

	render () {

		const {message} = this.props;
		return (
			<div className="body">
				<div className="content-w3ls">
					<div className="content-top-agile">
						<h2>Register</h2>
					</div>
					<div className="content-bottom">

						<form onSubmit={this.register} onKeyDown={this.handleKeyDown.bind(this)}>
							<div className="err-msg">
							{message}
							</div>
							<div className="field-group">
								<span className="fa fa-user" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="name" id="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Name" required />
								</div>
							</div>

							<div className="field-group">
								<span className="fa fa-suitcase" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="email" id="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" required/>
								</div>
							</div>
							
							<div className="field-group">
								<span className="fa fa-lock" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="password" id="password" type="Password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required />
								</div>
							</div>

							<div className="field-group">
								<span className="fa fa-lock" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="rePassword" id="re-enter-password" type="Password" value={this.state.rePassword} onChange={this.handleChange} placeholder="re-enter password" required />
								</div>
							</div>
							
							<small><a style={{fontSize: "14px"}} >Already created account? </a></small>
							
							
							<div className="wthree-field">
								<input name="submit" type="submit" value="submit" />
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ( state ) => {
	return {
		message: state.register.message,
		status: state.register.status
	}
}

const mapDispatchToProps = {
	register: registerAction.register,
	notifyError: registerAction.notifyError
}

RegisterPage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( RegisterPage )

export default RegisterPage