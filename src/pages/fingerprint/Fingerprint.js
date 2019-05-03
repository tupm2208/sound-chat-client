// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'

// CSS

// Actions
import { fingerprintActions } from '../../core/fingerprint'


class Fingerprint extends Component {

	constructor ( props ) {
		super ( props )
	}

	componentDidMount () {
		
		// this.props.loadYoutubeVideos ( this.props.params.query )
		console.log("this.prop finger: ", this.props)
		const { joinRoom, params, router} = this.props;

		joinRoom(params.id, router);
	}


	render () {

		return (
			<div className="browse-page">
				<button onClick={() => {this.props.router.push('/')}}>go to home page!</button>
			</div>
		)
	}
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ( ) => {
	return {
	}
}

const mapDispatchToProps = {
	joinRoom: fingerprintActions.joinRoom
}

Fingerprint = connect (
	mapStateToProps,
	mapDispatchToProps
) ( Fingerprint )

export default Fingerprint