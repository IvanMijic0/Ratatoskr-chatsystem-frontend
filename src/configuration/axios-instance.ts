import axios from 'axios';
import store from "../store";

const axiosInstanceWithCredentials = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	withCredentials: true,
});

axiosInstanceWithCredentials.interceptors.response.use(
	( response ) => response,
	async ( error ) => {
		const { response } = error;
		if ( response ) {
			const status = response.status;

			if ( status === 401 ) {
				const isAuthenticated = store.getState().auth.isAuthenticated;

				if ( isAuthenticated ) {
					try {
						await axiosInstanceWithCredentials.get('auth/refreshToken');
					} catch (error) {
						throw Error('Could not Refresh token.');
					}

					return axiosInstanceWithCredentials(error.config);
				} else {
					console.log('User is not authenticated. Redirect to login page.');
					window.location.href = '/login';
				}
			}
		}

		return Promise.reject(error);
	}
);


const axiosInstanceWithoutCredentials = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	withCredentials: false,
});

export { axiosInstanceWithCredentials, axiosInstanceWithoutCredentials };



