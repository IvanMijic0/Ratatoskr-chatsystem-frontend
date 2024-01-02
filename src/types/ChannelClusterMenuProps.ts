type ChannelClusterMenuProps = {
	anchorEl: HTMLElement | null,
	open: boolean,
	onClose: () => void,
	onAddDialogCLick: () => void,
	clusterId: string,
	onRemoveChannelDialogClick: () => void,
}

export default ChannelClusterMenuProps;