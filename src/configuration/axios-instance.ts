import axios from 'axios';
import { store } from "../store";

const instance = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
});

instance.defaults.headers.common['Authorization'] = `Bearer ${ localStorage.getItem('jwt') || null }`;

instance.interceptors.response.use(
	( response ) => response,
	async ( error ) => {
		const { response } = error;
		if ( response ) {
			const status = response.status;

			if ( status === 401 ) {
				const isAuthenticated = store.getState().auth.isAuthenticated;

				if ( isAuthenticated ) {
					try {
						await instance.get('/auth/refreshToken');
					} catch (error) {
						throw Error('Could not Refresh token.');
					}

					return instance(error.config);
				} else {
					console.log('User is not authenticated. Redirect to login page.');
				}
			} else if ( status === 403 ) {
				console.log("You are forbidden from accessing this.");
			}
		}

		return Promise.reject(error);
	}
);

export default instance;

const axiosInstanceGoogle = axios.create({
	baseURL: 'https://www.googleapis.com/',
	headers: {
		Accept: 'application/json',
	},
});

export const fetchGoogleUserInfo = ( accessToken: string | undefined ) => {
	return axiosInstanceGoogle.get(`/oauth2/v1/userinfo?access_token=${ accessToken }`, {
		headers: {
			Authorization: `Bearer ${ accessToken }`,
		}
	},);
};

