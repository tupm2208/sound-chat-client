// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { persistUtils } from '../../core/utils/persist'
import { generalUtils } from '../../core/utils/general'

// CSS
import './BrowsePage.css'

// Constants
import { initialVideoQuery } from '../../core/constants'

// Actions
import { appActions } from '../../core/app'
import { userActions } from '../../core/user'
import { videoListActions } from '../../core/videoList'
import { roomListActions } from '../../core/rooms'

// Components
import PageHeader from '../../components/pageHeader/PageHeader'
import VideoList from '../../components/videoList/VideoList'
import RoomList from '../../components/roomList/RoomList'

class BrowsePage extends Component {
	static propTypes = {
		isFetchingVideos: PropTypes.bool.isRequired,
		youtubeVideos: PropTypes.array.isRequired,
		user: PropTypes.object.isRequired,
		navigateToPath: PropTypes.func.isRequired,
		disconnectFromAllParties: PropTypes.func.isRequired,
		loadYoutubeVideos: PropTypes.func.isRequired,
		handleVideoSelection: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.renderRoomList = this.renderRoomList.bind(this)
	}

	componentDidMount () {
		// Load an initial set of movies from Youtube into Redux store
		this.props.loadYoutubeVideos ( initialVideoQuery.query, initialVideoQuery.videoType )
		if (generalUtils.isLogin()) {
			this.props.loadRoomList();
		}

		// Disconnect from any parties the user was still connected to
		this.props.disconnectFromAllParties ()
	}

	handleVideoSelection(videoDetail, videoType) {
		const { handleVideoSelection, router } = this.props
		const user = persistUtils.loadProperty('user', {});
		if (!user.id) {
			//show popup and redirect to loginpage
			router.push('/login');
		} else {
			handleVideoSelection(user.id, videoDetail.id, router)
		}
	}

	handleRoomSelection(roomId) {
		const { handleRoomSelection, router } = this.props;
		const user = persistUtils.loadProperty('user', {});
		if (!user.id) {
			//show popup and redirect to loginpage
			router.push('/login');
		} else {
			handleRoomSelection(roomId, router)
		}
	}

	renderRoomList() {
		const {isFetchingRooms, roomList } = this.props
		return (
			<div>
				<PageHeader
					titleLeader='Your conversations'
				/>

				<div className="g-row">
					<RoomList 
						showLoadingAnimation={isFetchingRooms}
						roomList={roomList}
						handleRoomSelection={this.handleRoomSelection.bind(this)}
					/>
				</div>
			</div>
		)
	}

	render () {
		const { user, isFetchingVideos, youtubeVideos } = this.props
		return (
			<div className="browse-page">
				<PageHeader
					titleLeader='Hi'
					titleMain={user.userName}
					titleAfter={'watch any Youtube video in sync together with your friends!'}
				/>

				<div className="g-row">
					<div className="introduction-text">
						<p>3 easy steps to watch any Youtube video together with a friend:</p>
						<ol>
							<li>Search for & select any Youtube video</li>
							<li>Share the custom generated party URL with your friends</li>
							<li>Watch the video together in perfect sync!</li>
						</ol>
					</div>

					<VideoList
						showLoadingAnimation={isFetchingVideos}
						youtubeVideos={youtubeVideos}
						handleVideoSelection={this.handleVideoSelection.bind(this)}
					/>

					{ generalUtils.isLogin() && this.renderRoomList() }
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
		isFetchingVideos: state.videoList.isFetching,
		youtubeVideos: state.videoList.youtubeVideos,
		roomList: state.rooms.roomList,
		isFetchingRooms: state.rooms.isFetching,
		user: state.user,
	}
}

const mapDispatchToProps = {
	navigateToPath: appActions.navigateToPath,
	disconnectFromAllParties: userActions.disconnectFromAllParties,
	loadYoutubeVideos: videoListActions.loadYoutubeVideos,
	handleVideoSelection: videoListActions.handleVideoSelection,
	loadRoomList: roomListActions.loadRoomList,
	handleRoomSelection: roomListActions.handleRoomSelection
}

BrowsePage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( BrowsePage )

export default BrowsePage