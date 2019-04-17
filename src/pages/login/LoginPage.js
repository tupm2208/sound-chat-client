// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// CSS
import './LoginPage.css'

// Constants
import { initialVideoQuery } from '../../core/constants'

// Actions
import { appActions } from '../../core/app'
import { userActions } from '../../core/user'
import { loginAction } from '../../core/login'

class LoginPage extends Component {
	static propTypes = {
		// isFetchingVideos: PropTypes.bool.isRequired,
		// youtubeVideos: PropTypes.array.isRequired,
		// user: PropTypes.object.isRequired,
		// navigateToPath: PropTypes.func.isRequired,
		// disconnectFromAllParties: PropTypes.func.isRequired,
		// loadYoutubeVideos: PropTypes.func.isRequired,
		// handleVideoSelection: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {"email": "", password: "", "isRemember": true}
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	componentDidMount () {

		if(localStorage.getItem("isRemember")) {
			const email = localStorage.getItem('email') || "";
			const password = localStorage.getItem("password") || "";

			this.setState({email, password, isRemember: true});
		}
		
	}

	handleChange(event) {
		const {name, value, checked} = event.target;
		
		this.setState({[name]: name === 'isRemember'? checked: value});
	}

	login(e) {
		const {email, password} = this.state;
		const {login} = this.props;

		login(email, password);
		e.preventDefault()
	}

	render () {

		const {message} = this.props;
		console.log("message", message)
		return (
			<div className="body">
				<h1 className="title-agile text-center"></h1>

				<div className="content-w3ls">
					<div className="content-top-agile">
						<h2>sign in</h2>
					</div>
					<div className="content-bottom">

						<form onSubmit={this.login}>
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
								{/* <li>
										className="text-right"
									<a routerLink="forgetpassword" style="color: navy;" >Forget your password</a>
								</li> */}
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
	navigateToPath: appActions.navigateToPath,
	disconnectFromAllParties: userActions.disconnectFromAllParties,
	login: loginAction.login,
}

LoginPage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( LoginPage )

export default LoginPage