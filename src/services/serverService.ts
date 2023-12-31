import { axiosInstance } from "../configuration";
import { ChannelClusterServiceProps, ChannelServiceProps, Server } from "../types";

const createChannel = async ( { serverId, channelClusterId, channelName }: ChannelServiceProps ): Promise<void> => {
	try {
		await axiosInstance.post('/server/channel', null, {
			params: {
				serverId,
				channelClusterId,
				channelName
			}
		});
	} catch (error) {
		console.error('Error creating channel:', error);
		throw error;
	}
};

const deleteChannelCluster = async ( { serverId, channelClusterId }: ChannelClusterServiceProps ): Promise<void> => {
	try {
		await axiosInstance.delete(`/server/${ serverId }/channelCluster/${ channelClusterId }`);
	} catch (error) {
		console.error('Error deleting channel cluster:', error);
		throw error;
	}
};

const deleteChannels =
	async ( {
				serverId,
				channelClusterId,
				removableChannelIds
			}: ChannelServiceProps ): Promise<void> => {
		try {
			await axiosInstance.delete(`/server/${ serverId }/channelCluster/${ channelClusterId }/channels`, {
				data: removableChannelIds,
			});
		} catch (error) {
			console.error('Error deleting channels:', error);
			throw error;
		}
	};

const createChannelCluster = async ( { serverId, channelClusterName }: ChannelClusterServiceProps ): Promise<void> => {
	try {
		await axiosInstance.post('/server/channelCluster', null, {
			params: {
				serverId,
				channelClusterName,
			},
		});
	} catch (error) {
		console.error('Error creating channel cluster:', error);
		throw error;
	}
};

const deleteServer = async ( { id }: Server ): Promise<void> => {
	try {
		await axiosInstance.delete(`/server/${ id }`);
		console.log('Server deleted successfully');
	} catch (error) {
		console.error('Error deleting server:', error);
		throw error;
	}
};

const createServer = async ( formData: FormData ): Promise<void> => {
	try {
		await axiosInstance.post('/server', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (error) {
		console.error('Error creating server:', error);
		throw error;
	}
};

const fetchServerSummary = async (): Promise<any> => {
	try {
		const response = await axiosInstance.get('/server/summary');
		return response.data;
	} catch (error) {
		console.error('Error fetching server summary data:', error);
		throw error;
	}
};

export default {
	createChannel,
	deleteChannelCluster,
	deleteChannels,
	createChannelCluster,
	deleteServer,
	createServer,
	fetchServerSummary,
};