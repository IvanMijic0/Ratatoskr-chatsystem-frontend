import UserInfo from "./UserInfo.ts";

type UserState = {
	userInfo: UserInfo | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default UserState;