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
		this.state = {email: "", password: "", name: "", "buttonClicked": false}
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	register(e) {
		const {email, password, name} = this.state;
		const {register, router} = this.props;
		register(email, password, name, router);
		e.preventDefault()
	}

	render () {

		const {message} = this.props;
		return (
			<div className="body">
				<h1 className="title-agile text-center"></h1>

				<div className="content-w3ls">
					<div className="content-top-agile">
						<h2>Register</h2>
					</div>
					<div className="content-bottom">

						<form onSubmit={this.register} onClick={this.register.bind(this)}>
							<div className="err-msg">
							{message}
							</div>
							<div className="field-group">
								<span className="fa fa-suitcase" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="name" id="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Username" required />
								</div>
							</div>

							<div className="field-group">
								<span className="fa fa-user" aria-hidden="true"></span>
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
							
							<small><a style={{fontSize: "14px"}} >Already created account? </a></small>
							
							
							<a style={{color: "navy"}} className="text-right">Login</a>	
								<div className="wthree-field">
									<button name="register" type="submit" className="btn btn-success btn-lg" onClick={this.register}>Register</button>
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
		message: state.login.message
	}
}

const mapDispatchToProps = {
	register: registerAction.register,
}

RegisterPage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( RegisterPage )

export default RegisterPage