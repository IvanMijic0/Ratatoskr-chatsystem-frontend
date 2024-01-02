type RemoveChannelDialogProps = {
	open: boolean,
	onClose: () => void,
	channels: { name: string; id: string; }[],
	clusterId: string,
	removableChannelIds: string[],
	onRemovableChannelIds: ( arg0: ( prevState: any ) => any[] ) => void
};

export default RemoveChannelDialogProps;