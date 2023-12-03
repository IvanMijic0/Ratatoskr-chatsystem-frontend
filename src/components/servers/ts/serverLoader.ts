import { LoaderFunction } from "react-router-dom";
import axiosInstance from "../../../configuration/axios-instance.ts";

const serverLoader: LoaderFunction | undefined = async () => {
	try {
		return ( await axiosInstance.get('/server/summary') ).data;
	} catch (error) {
		console.log("Error fetching servers_ data: ", error);
		throw error;
	}
};

export default serverLoader;