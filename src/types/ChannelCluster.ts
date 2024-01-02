import Channel from "./Channel.ts";

type ChannelCluster = {
	id: string;
	name: string;
	channels: Channel[];
}

export default ChannelCluster;