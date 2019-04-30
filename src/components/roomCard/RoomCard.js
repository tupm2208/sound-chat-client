// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'
import { videoUtils } from '../../core/utils/index'

// CSS
import './RoomCard.css'

export default class RoomCard extends Component {
	// static propTypes = {
	// 	video: PropTypes.object.isRequired,
	// 	videoSource: PropTypes.string.isRequired,
	// 	handleVideoSelection: PropTypes.func.isRequired
	// }


	render () {
		const { room, handleRoomSelection } = this.props

		return (
			<div className="video-card g-col card"
				 onClick={() => {
					 handleRoomSelection (room.id)
				 }}>

				<div className="card-content room-card-content">
					<div className="main">
						<h1 className="room-name">
							<Truncate lines={2} ellipsis='...'>
								{room.name}
							</Truncate>
						</h1>
					</div>

				</div>

			</div>
		)
	}
}