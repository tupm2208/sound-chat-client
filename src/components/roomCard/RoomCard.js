// Libs & utils
import React, { Component } from 'react'
import Truncate from 'react-truncate'
// CSS
import './RoomCard.css'

export default class RoomCard extends Component {

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