import axios from 'axios';
import { store } from "../store";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { setTokens } from "../store/slice/auth_slice/auth-slice.ts";

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
		const refreshToken = store.getState().auth.refreshToken;

		token
			? config.headers['Authorization'] = `Bearer ${ token }`
			: delete config.headers['Authorization'];
		refreshToken
			? ( config.headers['Refresh-Token'] = refreshToken )
			: delete config.headers['Refresh-Token'];

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
			const refreshToken = store.getState().auth.refreshToken;
			const token = store.getState().auth.token;

			// TODO figure out when to logout user

			if ( isAuthenticated && isTokenExpired(token) && !isTokenExpired(refreshToken) ) {
				try {
					store.dispatch({ type: "aut/PURGE" });
					console.log("Refreshing token");

					const {
						data: {
							token: newToken,
							refreshToken: newRefreshToken
						}
					} = await axios.post('http://localhost:8080/api/v1/auth/refreshToken', { refreshToken });

					store.dispatch(setTokens({ token: newToken, refreshToken: newRefreshToken }));
				} catch (error) {
					console.error('Could not refresh token:', error);
					store.dispatch({ type: "aut/PURGE" });
					console.log('User is not authenticated. Redirect to the login page.');
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