// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { videoUtils, generalUtils } from '../../core/utils'

// Constants
import { videoPlayerConfig } from '../../core/constants'

// CSS
import './VideoPlayer.css'

// Components
import VideoPlayerControls from '../videoPlayerControls/VideoPlayerControls'
import MobileDevicePlayerDialog from '../mobileDevicePlayerDialog/MobileDevicePlayerDialog'

export default class VideoPlayer extends Component {

	static propTypes = {
		selectedVideo: PropTypes.object.isRequired,
		partyId: PropTypes.string.isRequired,
		userName: PropTypes.string,
		videoPlayerIsMuted: PropTypes.bool,
		videoPlayerIsMaximized: PropTypes.bool,
		videoPlayerIsLoaded: PropTypes.bool,
		videoProgress: PropTypes.number.isRequired,
		userVideoPlayerState: PropTypes.object.isRequired,
		partyVideoPlayerState: PropTypes.object.isRequired,
		onPlayerStateChange: PropTypes.func.isRequired,
		emitNewPlayerStateToServer: PropTypes.func.isRequired,
		setPlayerMutedState: PropTypes.func.isRequired,
		setPlayerProgress: PropTypes.func.isRequired,
		setPlayerIsLoadedState: PropTypes.func.isRequired,
		handleMaximizeBtnPressed: PropTypes.func.isRequired,
	}

	constructor ( props ) {
		super ( props )
		const { setPlayerIsLoadedState } = props

		// Initially -> always make sure that the videoPlayerLoaded state is
		// reset to false
		setPlayerIsLoadedState ( false )
	}

	componentDidUpdate ( prevProps, prevState ) {
		const { videoPlayerIsLoaded, userVideoPlayerState } = this.props
		const prevPartyPlayerState = prevProps.partyVideoPlayerState
		const currentPartyPlayerState = this.props.partyVideoPlayerState
		const userIsBuffering = userVideoPlayerState.status === 'buffering'
		const internalVideoPlayer = this.videoPlayer.getInternalPlayer ()

		// As soon as the videoPlayer is loaded, start listening for playerStateChange commands from the server
		if ( videoPlayerIsLoaded && internalVideoPlayer && !userIsBuffering ) {
			// Handle initial synchronization of our videoPlayer with the rest of the party when we first join a party
			this.handleInitialPlayerStateSynchronization ( currentPartyPlayerState, internalVideoPlayer )

			// Handle when a user 'seeks' in a video
			this.handleSeekToCommandsFromServer ( prevPartyPlayerState, currentPartyPlayerState, internalVideoPlayer )
		}
	}

	/**
	 * When we join a party, make sure that our videoPlayer is at the same time in the video as the rest of the party
	 * @param currentPartyPlayerState
	 * @param internalVideoPlayer
	 */
	handleInitialPlayerStateSynchronization = ( currentPartyPlayerState, internalVideoPlayer ) => {
		const isInitialPlayerStateForParty = currentPartyPlayerState.media_time === 0
		const isInitialPlayerStateForUser = internalVideoPlayer.getCurrentTime () === 0
		if ( !isInitialPlayerStateForParty && isInitialPlayerStateForUser ) {
			internalVideoPlayer.seekTo ( currentPartyPlayerState.media_time )
		}
	}

	/**
	 * When the status for the party updates -> adjust this clients' videoPlayer to
	 * match the media_time of the party
	 * @param prevPartyPlayerState
	 * @param currentPartyPlayerState
	 * @param internalVideoPlayer
	 */
	handleSeekToCommandsFromServer = ( prevPartyPlayerState, currentPartyPlayerState, internalVideoPlayer ) => {
		const partyPlayerStateUpdated = prevPartyPlayerState !== currentPartyPlayerState
		const isInitialPlayerStateForParty = currentPartyPlayerState.media_time === 0
		const isNewPlayerState = prevPartyPlayerState.status !== currentPartyPlayerState.status ||
			prevPartyPlayerState.media_time !== currentPartyPlayerState.media_time

		if ( partyPlayerStateUpdated && isNewPlayerState && !isInitialPlayerStateForParty ) {
			internalVideoPlayer.seekTo ( currentPartyPlayerState.media_time + 0.1 )
		}
	}

	/**
	 * Returns a users' status object containing the status and media_time
	 * @param status
	 * @param videoPlayer
	 * @returns {{status: *, media_time}}
	 */
	constructUserPlayerState = ( status, videoPlayer ) => {
		return {
			status,
			media_time: videoPlayer.getCurrentTime ()
		}
	}

	render () {
		const {
			selectedVideo,
			partyVideoPlayerState,
			videoPlayerIsMuted,
			videoPlayerIsMaximized,
			videoPlayerIsLoaded,
			emitNewPlayerStateToServer,
			onPlayerStateChange,
			setPlayerProgress,
			setPlayerMutedState,
			setPlayerIsLoadedState,
			handleMaximizeBtnPressed,
			videoProgress,
			partyId
		} = this.props

		const videoPlayer = this.videoPlayer
		const videoUrl = videoUtils.getVideoUrl ( selectedVideo.videoSource, selectedVideo.id )
		const videoDuration = videoPlayer && videoPlayerIsLoaded ? videoPlayer.getDuration () : null
		const videoIsPlaying = partyVideoPlayerState.status === 'playing'
		const videoPlayerClassNames = classNames ( 'video-player', {
			'maximized': videoPlayerIsMaximized
		} )

		return (
			<div className={videoPlayerClassNames}>
				<ReactPlayer
					url={ videoUrl }
					width={ '100%' }
					height={ '100%' }
					muted={ videoPlayerIsMuted }
					playing={ videoIsPlaying }
					ref={e => this.videoPlayer = e}
					onReady={() => {
						
						setPlayerIsLoadedState ( true )
					}}
					onPlay={() => {
						// Make sure that if this onPlay handler is called accidentally while the server is still
						// telling us to pause, that we DO actually remain pausing
						if ( !videoIsPlaying ) {
							videoPlayer.getInternalPlayer ().pauseVideo ()
						}
						onPlayerStateChange (
							this.constructUserPlayerState ( 'playing', videoPlayer )
						)
					}}
					onPause={() => {
						
						onPlayerStateChange (
							this.constructUserPlayerState ( 'pausing', videoPlayer )
						)
					}}
					onBuffer={() => {
						onPlayerStateChange (
							this.constructUserPlayerState ( 'buffering', videoPlayer )
						)
					}}
					onEnded={() => {
						console.log("end video: ", videoProgress);
						emitNewPlayerStateToServer ( {
							status: 'finished',
							media_time: videoProgress
						}, partyId )
					}}
					onProgress={ setPlayerProgress }
					config={ videoPlayerConfig }
					style={ { position: 'absolute' } }
				/>

				<VideoPlayerControls
					partyVideoPlayerState={ partyVideoPlayerState }
					emitNewPlayerStateToServer={ emitNewPlayerStateToServer }
					partyId={ partyId }
					videoPlayerIsMuted={ videoPlayerIsMuted }
					videoPlayerIsMaximized={ videoPlayerIsMaximized }
					videoProgress={ videoProgress }
					videoDuration={ videoDuration }
					handleMuteBtnPressed={ () => setPlayerMutedState ( !videoPlayerIsMuted ) }
					handleMaximizeBtnPressed={ () => handleMaximizeBtnPressed (
						videoPlayerIsMaximized,
						document.getElementsByClassName ( 'video-player' )[ 0 ]
					) }
				/>

				{generalUtils.isMobileDevice () &&
				<MobileDevicePlayerDialog
					partyId={partyId}
					videoPlayer={videoPlayer}
					videoPlayerIsLoaded={videoPlayerIsLoaded}
					partyVideoPlayerState={partyVideoPlayerState}
					emitNewPlayerStateToServer={emitNewPlayerStateToServer}
				/>}

			</div>
		)
	}
}