import extractPayloadFromToken from "../helpers/jwt-helper.ts";
import { useMemo } from "react";

const useTokenPayload = () => {
	return localStorage.getItem("token");
};

const useMemoizedTokenPayload = () => {
	const token = useTokenPayload();

	return useMemo(() => {
		return extractPayloadFromToken(token);
	}, [token]);
};

export default useMemoizedTokenPayload;