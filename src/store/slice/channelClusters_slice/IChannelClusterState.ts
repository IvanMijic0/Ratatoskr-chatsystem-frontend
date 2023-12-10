interface Channel {
	id: string;
	name: string;
	chatMessage?: [];
}

interface ChannelCluster {
	id: string;
	name: string;
	channelInfos: Channel[];
}

interface IChannelClustersState {
	data: ChannelCluster[];
	currentChannelClusterId: string;
	currentChannelClusterName: string;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default IChannelClustersState;