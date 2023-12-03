interface Server {
	avatarIconUrl: string;
	id: string;
	name: string;
}

interface IServerState {
	serverInfoData: Server[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	currentServerName: string | null;
	currentServerId: string | null;
}

export default IServerState;