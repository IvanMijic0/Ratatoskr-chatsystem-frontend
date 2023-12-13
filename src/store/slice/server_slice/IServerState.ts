export interface IServer {
	avatarIconUrl: string;
	id: string;
	name: string;
	firstClusterId?: string;
	firstChannelId?: string;
}

interface IServerState {
	serverInfoData: IServer[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	currentServerName: string | null;
	currentServerId: string | null;
}

export default IServerState;