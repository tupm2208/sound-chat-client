// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { persistUtils } from '../../core/utils'

// Assets
import logo from '../../assets/logo_white.svg'

// CSS
import './AppHeader.css'

// Components
import SearchBar from '../searchBar/SearchBar'

export default class AppHeader extends Component {
	static propTypes = {
		search: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		toggleSearch: PropTypes.func.isRequired,
		handleSearch: PropTypes.func.isRequired,
		router: PropTypes.object.isRequired,
	}

	/**
	 * Navigate to the homepage using react-router
	 */
	navigateToHomePage = () => {
		this.props.router.push ( '/' )
	}

	logout = () => {
		persistUtils.saveProperty("access_token",'');
		this.props.router.push('/login')
	}

	/**
	 * Conditionally render a search button
	 * @param bool
	 * @returns {*}
	 */
	renderSearchButton = ( isLogin ) => {
		return (
				<ul>
					<li>
						<span className="btn btn-icon fa fa-search" onClick={this.props.toggleSearch}/>
					</li>
					{!isLogin?
						(<li><span className="btn btn-icon fa fa-sign-in" onClick={this.logout}/></li>):
						(<li><span className="btn btn-icon fa fa-sign-out" onClick={this.logout}/> </li>)}
				</ul>
				
			)
	}

	render () {
		const { search, handleSearch, user, isLogin } = this.props

		return (
			<div className="app-header">
				<div className="g-row">
					<div className="g-col">

						<div className="header-title-wrapper" onClick={this.navigateToHomePage}>
							<img src={logo} className="content logo" alt="bramgiessen.com logo"/>
							<span className="content">Youtube Video Sync</span>
						</div>

						<ul className="header-actions">
							{this.renderSearchButton ( isLogin )}
						</ul>

					</div>
				</div>

				<div className="g-row">
					<div className="g-col">
						<SearchBar
							search={search}
							handleSearch={handleSearch}
						/>
					</div>
				</div>

			</div>
		)
	}
}