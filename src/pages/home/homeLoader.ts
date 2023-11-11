import { LoaderFunction } from "react-router-dom";
import { axiosInstanceWithCredentials } from "../../configuration/axios-instance.ts";

const homeLoader: LoaderFunction | undefined = async () => {
	try {
		const response = await axiosInstanceWithCredentials.get(`/user/specific`);
		return response.data;
	} catch (error) {
		console.log("Error fetching user data: ", error);
		throw error;
	}
};

export default homeLoader;
