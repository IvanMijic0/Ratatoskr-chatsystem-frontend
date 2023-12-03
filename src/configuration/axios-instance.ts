import axios from 'axios';
import { store } from "../store";
import { jwtDecode, JwtPayload } from "jwt-decode";

const instance = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
});

const isTokenExpired = ( token: string ): boolean => {
	try {
		const decodedToken: JwtPayload = jwtDecode(token);

		return decodedToken.exp !== undefined && decodedToken.exp < Date.now() / 1000;
	} catch (error) {
		console.error('Error decoding token:', error);
		return true;
	}
};

instance.interceptors.request.use(
	( config ) => {
		const token = store.getState().auth.token;
		token
			? config.headers['Authorization'] = `Bearer ${ token }`
			: delete config.headers['Authorization'];

		return config;
	},
	( error ) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	( response ) => response,
	async ( error ) => {
		const { response } = error;
		if ( response ) {
			const isAuthenticated = store.getState().auth.isAuthenticated;
			const token = store.getState().auth.token;

			if ( isAuthenticated && isTokenExpired(token) ) {
				try {
					console.log("Refreshing token");
					console.log("You need to handle this better.");
					// const { data: { token, refreshToken } } = await instance.get('/auth/refreshToken');
					// store.dispatch(setTokens({ token, refreshToken }));
				} catch (error) {
					throw Error('Could not Refresh token.');
				}

				return instance(error.config);
			} else {
				console.log('User is not authenticated. Redirect to login page.');
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
	});
};