import { Server } from '../types';

type ServerState = {
	serverInfoData: Server[];
	error: string | null;
	currentServerName: string | null;
	currentServerId: string | null;
}

export default ServerState;