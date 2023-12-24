import Channel from "./Channel.ts";

type ChannelCluster = {
	id: string;
	name: string;
	channelInfos: Channel[];
}

export default ChannelCluster;