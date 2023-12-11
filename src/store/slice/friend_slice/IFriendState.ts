interface Friend {
	_id: string;
	username: string;
	fullName: string;
	email: string;
	avatarUrl: string;
}

interface IFriendState {
	friendInfoData: Friend[]; // Assuming Friend is a type representing the structure of friend info
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	currentFriendName: string;
	currentFriendId: string;
}

export default IFriendState;