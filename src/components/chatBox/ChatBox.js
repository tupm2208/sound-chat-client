// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './ChatBox.css'

export default class ChatBox extends Component {
	static propTypes = {
		onMessageSend: PropTypes.func.isRequired,
		partyId: PropTypes.string.isRequired,
		userName: PropTypes.string,
		messagesInParty: PropTypes.array
	}

	componentDidMount () {
		this.messageBox.scrollTop = this.messageBox.scrollHeight
	}

	componentDidUpdate () {
		this.messageBox.scrollTop = this.messageBox.scrollHeight
	}

	renderMessages = ( messages ) => {
		const { userId } = this.props


		return (
			<div className="messages-wrapper">

				{messages.map ( ( message, index ) => {
					const cpMessage = JSON.parse(JSON.stringify(message))
					if(!message.name && !message.username && message.user) {
						cpMessage.username = cpMessage.user.name;
					}
					const cssClasses = classNames ( 'message', {
						'self': userId === message.user_id
					} )

					return (
						<div className="message-wrapper" key={index}>
							<div className={cssClasses}>
								<span className="username">{cpMessage.username}: </span>
								<span className="body">{message.content? message.content: message.message}</span>
							</div>
						</div>
					)
				} )}

			</div>
		)
	}

	submitChatMessage = ( event ) => {
		const { onMessageSend, partyId } = this.props

		event.preventDefault ()
		const inputValue = this.messageInput.value.trim ()
		onMessageSend ( inputValue, partyId )
		this.messageInput.value = ''
	}

	render () {
		const { messagesInParty } = this.props

		return (
			<div className="chat-box">

				<div className="message-box" ref={e => this.messageBox = e}>
					{this.renderMessages ( messagesInParty )}
				</div>

				<form className="input-box" action="#" onSubmit={this.submitChatMessage}>
					<input
						type="text"
						ref={e => this.messageInput = e}
						className="input"
						placeholder="Say hello!"/>

					<input
						className="submit"
						type="submit"/>
				</form>

			</div>
		)
	}
}