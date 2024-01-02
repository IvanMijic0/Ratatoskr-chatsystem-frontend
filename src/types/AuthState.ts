type AuthState = {
	isAuthenticated?: boolean;
	token: string | null,
	refreshToken: string | null
}

export default AuthState;

