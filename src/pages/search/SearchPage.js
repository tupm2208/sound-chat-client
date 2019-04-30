// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { persistUtils } from '../../core/utils/persist'

// CSS
import './SearchPage.css'

// Actions
import { videoListActions } from '../../core/videoList/index'

// Components
import PageHeader from '../../components/pageHeader/PageHeader'
import VideoList from '../../components/videoList/VideoList'

class SearchPage extends Component {
	static propTypes = {
		isFetchingVideos: PropTypes.bool.isRequired,
		youtubeVideos: PropTypes.array.isRequired,
		user: PropTypes.object.isRequired,
		loadYoutubeVideos: PropTypes.func.isRequired,
		handleVideoSelection: PropTypes.func.isRequired
	}

	constructor ( props ) {
		super ( props )
		this.state = {}
	}

	componentDidMount () {
		// Load Youtube video search results into Redux store
		this.props.loadYoutubeVideos ( this.props.params.query )
	}

	componentWillUpdate ( nextProps ) {
		// If the url query param has changed -> load new search results based on its new value
		if ( nextProps.params.query !== this.props.params.query ) {
			// Search query has been changed
			this.props.loadYoutubeVideos ( nextProps.params.query )
		}
	}

	handleVideoSelection(videoDetail, videoType) {
		const { handleVideoSelection, router } = this.props
		const user = persistUtils.loadProperty('user', {});
		if (!user.id) {
			//show popup and redirect to loginpage
			router.push('/login');
		} else {
			console.log("video: ", videoDetail);
			handleVideoSelection(user.id, videoDetail.id, router)
		}
	}

	render () {
		const currentQuery = this.props.params.query

		return (
			<div className="browse-page">
				<PageHeader
					titleLeader='Search results'
					titleMain={currentQuery}
				/>

				<div className="g-row">
					<VideoList
						showLoadingAnimation={this.props.isFetchingVideos}
						youtubeVideos={this.props.youtubeVideos}
						handleVideoSelection={this.handleVideoSelection.bind(this)}
					/>
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
		user: state.user
	}
}

const mapDispatchToProps = {
	loadYoutubeVideos: videoListActions.loadYoutubeVideos,
	handleVideoSelection: videoListActions.handleVideoSelection
}

SearchPage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( SearchPage )

export default SearchPage