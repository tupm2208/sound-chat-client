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
		
		console.log("this.prop finger: ", this.props)
		if(this.props.isInit) {
			this.props.router.push('/')
			this.props.resetIsInit()
			return;
		}
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

const mapStateToProps = (state) => {
	return {
		isInit: state.fingerprint.isInit
	}
}

const mapDispatchToProps = {
	joinRoom: fingerprintActions.joinRoom,
	resetIsInit: fingerprintActions.resetIsInit
}

Fingerprint = connect (
	mapStateToProps,
	mapDispatchToProps
) ( Fingerprint )

export default Fingerprint