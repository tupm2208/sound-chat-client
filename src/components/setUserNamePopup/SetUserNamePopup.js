// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './SetUserNamePopup.css'

export default class SetUserNamePopup extends Component {
	static propTypes = {
		isVisible: PropTypes.bool.isRequired,
		handleSetNewRoomName: PropTypes.func.isRequired,
		closePopup: PropTypes.func.isRequired
	}

	escFunction(event){
		if(event.keyCode === 27) {
		  //Do whatever when esc is pressed
		//   console.log("btn")
		this.props.closePopup()
		}
	}
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction.bind(this), false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction.bind(this), false);
	}

	render () {
		const { isVisible, handleSetNewRoomName, callBackCreateRoom } = this.props

		// Hide the createUserName block if the user is not in the process of creating a username
		const setUserNamePopupCssClasses = classNames ( 'set-username-popup-wrapper', {
			'hidden': !isVisible
		} )

		return (
			<div className={setUserNamePopupCssClasses}>
				<div className="set-username-popup">
					<span className="create-username-header">What is new party's name?</span>
					<span className="create-username-description">Let everybody knows the name of the room!</span>

					<div className="username-details">

						<input
							ref={e => this.input = e}
							autoComplete="off"
							className="input user-name"
							maxLength="60"
							placeholder="Room's name"
							tabIndex="0"
							type="text"
						/>
					</div>

					<div className="create-username button" onClick={() => {
						handleSetNewRoomName ( this.input.value.trim (), callBackCreateRoom )
					}}>Continue
					</div>
				</div>
			</div>
		)
	}
}