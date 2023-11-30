import { LoaderFunction } from "react-router-dom";
import axiosInstance from "../../configuration/axios-instance.ts";

const homeLoader: LoaderFunction | undefined = async () => {
	try {
		return ( await axiosInstance.get(`/user/specific`) ).data;
	} catch (error) {
		console.log("Error fetching user data: ", error);
		throw error;
	}
};

export default homeLoader;
