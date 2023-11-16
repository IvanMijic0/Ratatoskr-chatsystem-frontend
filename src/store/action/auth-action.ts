import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axiosInstance from '../../configuration/axios-instance.ts';
import { setIsAuthenticated, setTokens } from '../slice/auth-slice.ts';
import axios from 'axios';
import { RootState } from "../index.ts";
import { AnyAction } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;
export const validateTokenAsync = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await axiosInstance.post('/auth/validateToken');
			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
		}
	};
};

export const setAuthData = (
	loginData?: { usernameOrEmail: string | null; password: string | null },
	googleLoginData?: {
		email: string;
		firstName: string;
		lastName: string;
		googleId: string;
		avatarImageUrl: string;
	}
): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			const {
				data: { token, refreshToken },
			} = await axios.post(
				`http://localhost:8080/api/v1/auth/${ loginData != undefined ? 'login' : 'loginWithGoogle' }`,
				loginData != undefined ? loginData : googleLoginData
			);

			localStorage.setItem('jwt', token);
			localStorage.setItem('jwtRefresh', refreshToken);

			dispatch(setTokens({ token, refreshToken }));

			triggerReload();
		} catch (error: any) {
			console.error('Authentication error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			throw new Error(errorMessage);
		}
	};
};

const triggerReload = () => {
	window.location.reload();
};
