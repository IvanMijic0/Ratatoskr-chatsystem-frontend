import axios from "axios";

const axiosInstanceGoogle = axios.create({
	baseURL: 'https://www.googleapis.com/',
	headers: {
		Accept: 'application/json',
	},
});

export default axiosInstanceGoogle;