import axios from 'axios';
import { setTokens, store } from "../store";
import { jwtDecode, JwtPayload } from "jwt-decode";

const instance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
});

const isTokenExpired = (token: string): boolean => {
	try {
		const decodedToken: JwtPayload = jwtDecode(token);

		return decodedToken.exp !== undefined && decodedToken.exp < Date.now() * 0.0001;
	} catch (error) {
		console.error('Error decoding token:', error);
		return true;
	}
};

instance.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.token;
		const refreshToken = store.getState().auth.refreshToken;

		token
			? config.headers['Authorization'] = `Bearer ${token}`
			: delete config.headers['Authorization'];
		refreshToken
			? (config.headers['Refresh-Token'] = refreshToken)
			: delete config.headers['Refresh-Token'];

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { response } = error;
		if (response) {
			const isAuthenticated = store.getState().auth.isAuthenticated;
			const refreshToken = store.getState().auth.refreshToken;
			const token = store.getState().auth.token;

			if (isAuthenticated && isTokenExpired(token) && !isTokenExpired(refreshToken)) {
				try {
					store.dispatch({ type: "aut/PURGE" });
					console.log("Refreshing token");

					const {
						data: {
							token: newToken,
							refreshToken: newRefreshToken
						}
					} = await axios.post(`${import.meta.env.BASE_URL}/auth/refreshToken`, { refreshToken });

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