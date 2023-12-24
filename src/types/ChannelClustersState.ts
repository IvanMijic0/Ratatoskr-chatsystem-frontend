import ChannelCluster from "./ChannelCluster.ts";

type ChannelClustersState = {
	data: ChannelCluster[];
	currentChannelClusterId: string;
	currentChannelClusterName: string;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default ChannelClustersState;