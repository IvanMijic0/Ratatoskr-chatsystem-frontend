import { LoaderFunction } from "react-router-dom";

const homeLoader: LoaderFunction | undefined = async () => {
	console.log("loaded");
};

export default homeLoader;
