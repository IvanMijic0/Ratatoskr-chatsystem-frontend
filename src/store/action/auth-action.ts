import { AppThunk, RootState, UserInfo } from "../../types";
import { AuthService } from "../../services";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import { setIsAuthenticated } from "../slice/auth-slice.ts";

const validateTokenAsync = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await AuthService.validateToken();
			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
			console.error('Authentication Error:', error);
			throw error;
		}
	};
};

const setAuthData = (
	loginData?: UserInfo | undefined,
	googleLoginData?: UserInfo | undefined
): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await AuthService.setAuthData(loginData, googleLoginData, dispatch);
		} catch (error) {
			console.error('Authentication Error:', error);
			throw error;
		}
	};
};

const register = ( registerData: UserInfo ): AppThunk => {
	return async () => {
		await AuthService.register(registerData);
	};
};


export default { validateTokenAsync, setAuthData, register };