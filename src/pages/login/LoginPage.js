// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'

// CSS
import './LoginPage.css'
import {lcStorage} from '../../core/utils/localStorage';

// Constants

// Actions
import { loginAction } from '../../core/login'

class LoginPage extends Component {
	static propTypes = {
	}

	constructor(props) {
		super(props)
		this.state = {"email": "", password: "", "isRemember": false}
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	componentDidMount () {

		if(lcStorage.get("isRemember")) {
			const email = lcStorage.get('email') || "";
			const password = lcStorage.get("password") || "";

			this.setState({email, password, isRemember: true});
		}
		
	}

	handleChange(event) {
		const {name, value, checked} = event.target;
		
		this.setState({[name]: name === 'isRemember'? checked: value});
	}

	handleKeyDown(e) {
		if (e.key === 'Enter') {
		  this.login(e);
		}
	}

	login(e) {
		const {email, password, isRemember} = this.state;
		const {login, router} = this.props;

		if(isRemember) {
			lcStorage.set('email', email);
			lcStorage.set('password', password);
			lcStorage.set('isRemember', isRemember);
		} else {
			lcStorage.set('email', '');
			lcStorage.set('password', '');
			lcStorage.set('isRemember', false);
		}
		login(email, password, router);
		e.preventDefault()
	}

	render () {

		const {message} = this.props;
		return (
			<div className="body">
				<h1 className="title-agile text-center"></h1>

				<div className="content-w3ls">
					<div className="content-top-agile">
						<h2>sign in</h2>
					</div>
					<div className="content-bottom">

						<form onSubmit={this.login} onKeyDown={this.handleKeyDown.bind(this)}>
							<div className="err-msg">
							{message}
							</div>
							<div className="field-group">
								<span className="fa fa-user" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="email" id="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Username" required/>
								</div>
							</div>
							<div className="field-group">
								<span className="fa fa-lock" aria-hidden="true"></span>
								<div className="wthree-field">
									<input name="password" id="password" type="Password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required />
								</div>
							</div>
							<small><a style={{fontSize: "14px"}} >Forgot your password?</a></small>
							<ul className="list-login">
								<li className="switch-agileits">
									<label className="switch">
										<input type="checkbox" checked={this.state.isRemember} onChange={this.handleChange} name="isRemember" />
										<span className="slider round"></span>
										<p className="slider-word">keep me signed in</p>   
									</label>
								</li>
								
								<li>
									<a style={{color: "navy"}} className="text-right">Create New Account</a>
								</li>
								<li className="clearfix"></li>
							</ul>
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
		message: state.login.message
	}
}

const mapDispatchToProps = {
	login: loginAction.login,
}

LoginPage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( LoginPage )

export default LoginPage