import { useSelector } from 'react-redux';
import { RootState } from "../store";

const useAuthToken = () => {
	return useSelector(( state: RootState ) => state.auth.token);
};

export default useAuthToken;
