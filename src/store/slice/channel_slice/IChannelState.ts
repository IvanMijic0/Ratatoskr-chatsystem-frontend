interface IChannelState {
	data: any[];
	currentChannelId: string;
	currentChannelName: string;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export default IChannelState;