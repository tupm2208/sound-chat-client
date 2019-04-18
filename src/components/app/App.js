// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// CSS
import './App.css'
import 'font-awesome/css/font-awesome.min.css'

// Components
import AppHeader from '../appHeader/AppHeader'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

// Actions
import { appActions } from "../../core/app"
import { searchActions } from "../../core/search"
import { userActions } from "../../core/user"
import { loadingActions } from '../../core/loading'

class App extends Component {
	static propTypes = {
		search: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		app: PropTypes.object.isRequired,
		party: PropTypes.object.isRequired,
		navigateToPath: PropTypes.func.isRequired,
		handleSearch: PropTypes.func.isRequired,
		toggleSearch: PropTypes.func.isRequired,
		setUserName: PropTypes.func.isRequired
	}

	componentWillUpdate ( nextProps ) {
		// Check if the current path has been changed, if so -> navigate to new path
		// if ( nextProps.app.currentPath !== this.props.router.location.pathname) {
		// 	// console.log("nextProps.app.currentPath: ", nextProps.app.currentPath)
		// 	this.props.router.push ( nextProps.app.currentPath )
		// }

		// If the partyId changes -> navigate to new party
		// if ( nextProps.party.partyId !== this.props.party.partyId ) {
		// 	// Navigate to newly created party
		// 	this.props.navigateToPath ( `/party/${nextProps.party.partyId}` )
		// }
	}

	render () {
		return (
			<div className="app grid">

				<AppHeader
					search={this.props.search}
					user={this.props.user}
					toggleSearch={this.props.toggleSearch}
					handleSearch={this.props.handleSearch}
					router={this.props.router}
				/>

				<main className="main">
					{/* Render the child component passed by react-router: */}
					{this.props.children}
				</main>
				<LoadingIndicator showLoadingAnnimation={this.props.loading}/>
			</div>
		)
	}
}

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ( state ) => {
	return {
		search: state.search,
		user: state.user,
		app: state.app,
		party: state.party,
		loading: state.loading.status
	}
}

const mapDispatchToProps = {
	navigateToPath: appActions.navigateToPath,
	handleSearch: searchActions.handleSearch,
	toggleSearch: searchActions.toggleSearchField,
	setUserName: userActions.setUserName,
	startLoading: loadingActions.startLoading,
	stopLoading: loadingActions.stopLoading
}

App = connect ( mapStateToProps, mapDispatchToProps ) ( App )

export default App
