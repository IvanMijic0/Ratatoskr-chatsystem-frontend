import { Connect } from "vite";
import Server = Connect.Server;

type ServerState = {
	serverInfoData: Server[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	currentServerName: string | null;
	currentServerId: string | null;
}

export default ServerState;