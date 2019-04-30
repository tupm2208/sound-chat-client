import App from '../components/app/App'
import BrowsePage from '../pages/browse/BrowsePage'
import PartyPage from '../pages/party/PartyPage'
import SearchPage from '../pages/search/SearchPage'
import LoginPage from '../pages/login/LoginPage'
import Fingerprint from '../pages/fingerprint/Fingerprint'


export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: BrowsePage
			}
		},
		{
			path: '/party/:partyId',
			component: PartyPage
		},
		{
			path: '/search/:query',
			components: SearchPage
		},
		{
			path: '/login',
			components: LoginPage
		},
		{
			path: '/fingerprint/:id',
			components: Fingerprint
		}
	]
};