interface UserInfo {
	username: string;
	fullName: string;
	email: string;
	avatarUrl: string;
}

interface IUserState {
	userInfo: UserInfo | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default IUserState;