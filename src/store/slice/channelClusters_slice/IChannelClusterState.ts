interface ChannelCluster {
	_id: string;
	name: string;
	channels: any[];
}

interface IChannelClustersState {
	data: ChannelCluster[];
	currentChannelClusterId: string;
	currentChannelClusterName: string;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default IChannelClustersState;