import { LoaderFunction } from "react-router-dom";
import axiosInstance from "../../configuration/axios-instance.ts";

const homeLoader: LoaderFunction | undefined = async () => {
	try {
		const response = await axiosInstance.get(`/user/specific`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log("Error fetching user data: ", error);
		throw error;
	}
};

export default homeLoader;
