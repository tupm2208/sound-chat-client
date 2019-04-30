// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';

// CSS
import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-toastify/dist/ReactToastify.css';

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
		const {message, error} = nextProps.app;
		if (message !== this.props.app.message || error !== this.props.app.error) {
			this.notifyA(message, error)
		}
		this.props.router.listen(() => {
			this.props.urlChange();
		});
	}

	notifyA = (msg, type) => {
		

		if(!type) {
			toast.success(msg, {
				containerId: 'A',
				position: toast.POSITION.TOP_CENTER,
				autoClose: false
			})
		} else {
			toast.error(msg, {
				containerId: 'A',
				position: toast.POSITION.TOP_CENTER,
				autoClose: false
			})
		}
	}
	render () {
		return (
			<div className="app grid">
				<ToastContainer containerId={'A'}/>
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
	stopLoading: loadingActions.stopLoading,
	urlChange: appActions.urlChange
}

App = connect ( mapStateToProps, mapDispatchToProps ) ( App )

export default App
