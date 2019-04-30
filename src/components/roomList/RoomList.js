// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CSS
import './RoomList.css'

// Components
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator'
import RoomCard from '../roomCard/RoomCard'

export default class VideoList extends Component {
	static propTypes = {
		roomList: PropTypes.array.isRequired,
		showLoadingAnimation: PropTypes.bool.isRequired,
		handleRoomSelection: PropTypes.func.isRequired
	}

	renderRoomCards = ( rooms, handleRoomSelection ) => {
		return (
			rooms.map ( ( room, index ) => {
				return (
					<RoomCard
						key={index}
						room={room}
						handleRoomSelection={handleRoomSelection}
					/>
				)
			} )
		)
	}

	render () {
		const { roomList, showLoadingAnimation, handleRoomSelection } = this.props

		return (
			<div className="video-list">
				<LoadingIndicator
					showLoadingAnnimation={showLoadingAnimation}
				/>

				{this.renderRoomCards(roomList, handleRoomSelection)}
			</div>
		)
	}
}