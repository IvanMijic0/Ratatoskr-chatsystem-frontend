interface IAuthState {
	isAuthenticated: boolean;
	token: string | null,
	refreshToken: string | null
}

export default IAuthState;

