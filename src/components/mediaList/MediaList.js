// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import img from '../../assets/images/thumb-up.png'

// CSS
import './MediaList.css'

export default class MediaList extends Component {
	static propTypes = {
		// onMediaSend: PropTypes.func.isRequired,
		// partyId: PropTypes.string.isRequired,
		// userName: PropTypes.string,
		// medias: PropTypes.array
	}

	componentDidMount () {
		this.mediaBox.scrollTop = this.mediaBox.scrollHeight
	}

	componentDidUpdate () {
		this.mediaBox.scrollTop = this.mediaBox.scrollHeight
	}

	renderMedias = ( medias ) => {
		const { userId, upvote, downvote, partyId } = this.props

		const sortedMedias = JSON.parse(JSON.stringify(medias))
		sortedMedias.sort((a,b) => {
			return b.total_vote - a.total_vote;
		})
		return (
			<div className="medias-wrapper">
				
				{sortedMedias.map ( ( media, index ) => {
					
					const cssClasses = classNames ( 'item', {
						'self': userId === media.user_id
					} )

					if(media.is_voted === undefined) {
						media.is_voted = userId === media.creator_id;
					}

					return (
						<div className="media-wrapper" key={index}>
							<div className={cssClasses}>
								<img className="imgDefault" alt="" src={media.data.thumbnails.default.url}></img>
								<span className="title">{media.data.title} </span>
								{/* <span className="vote">{media.content? media.content: media.media}</span> */}
								{!media.is_voted? 
								(<button className="vote" onClick={() => {upvote(media, partyId)}}>
									<div>{media.total_vote} <img alt="" width={15} src="http://www.clker.com/cliparts/R/U/Y/u/I/M/thumbs-up-icon-blue-hi.png"></img></div>
									<div>vote</div>
								</button>)
								: (<button className="unvote" onClick={() => {downvote(media, partyId)}}>
										<div>{media.total_vote} <img alt="" width={15} src="http://www.clker.com/cliparts/R/U/Y/u/I/M/thumbs-up-icon-blue-hi.png"></img></div>
										<div>unvote</div>
								</button>)}
							</div>
						</div>
					)
				} )}

			</div>
		)
	}

	submitChatMedia = ( event ) => {
		const { addMediaLink, partyId } = this.props

		event.preventDefault ()
		const inputValue = this.mediaInput.value.trim ()
		addMediaLink ( inputValue, partyId )
		this.mediaInput.value = ''
	}

	render () {
		const { medias } = this.props

		return (
			<div className="media-box">

				<div className="media-box" ref={e => this.mediaBox = e}>
					{this.renderMedias ( medias )}
				</div>

				<form className="input-box" action="#" onSubmit={this.submitChatMedia}>
					<input
						type="text"
						ref={e => this.mediaInput = e}
						className="input"
						placeholder="Enter youtube link!"/>

					<input
						className="submit"
						type="submit"/>
				</form>

			</div>
		)
	}
}