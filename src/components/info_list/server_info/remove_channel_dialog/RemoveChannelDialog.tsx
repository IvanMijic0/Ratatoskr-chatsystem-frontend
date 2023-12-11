import CustomDialog from "../../../ui/custom_dialog/CustomDialog.tsx";
import { Box, Button, Container, Typography } from "@mui/material";
import CustomButton from "../../../ui/CustomButton.tsx";
import { useState } from "react";
import RemovableChannels from "../removable_channels/RemovableChannels.tsx";

import classes from "./RemoveChannelDialog.module.css";
import axiosInstance from "../../../../configuration/axios-instance.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../../../store/slice/server_slice/server-slice.ts";
import { selectCurrentChannelClusterId } from "../../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import CustomCircularProgressBar from "../../../ui/CustomCircularProgressBar.tsx";
import { fetchChannelClustersData } from "../../../../store/action/channelClusters-action.ts";

export const RemoveChannelDialog = ( props: {
	open: boolean,
	onClose: () => void,
	channels: { name: string; id: string; }[],
	removableChannelIds: string[],
	onRemovableChannelIds: ( arg0: ( prevState: any ) => any[] ) => void
} ) => {
	const [isLoading, setIsLoading] = useState(false);
	const currentServerId = useAppSelector(selectCurrentServerId);
	const currentClusterId = useAppSelector(selectCurrentChannelClusterId);

	const dispatch = useAppDispatch();

	const handleSubmit = async ( event: { preventDefault: () => void; } ) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await axiosInstance.delete(`/server/${ currentServerId }/channelCluster/${ currentClusterId }/channels`, {
				data: props.removableChannelIds,
			});

			console.log('Channels deleted successfully!');

			dispatch(fetchChannelClustersData(currentServerId));
			props.onClose();

		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const channelClustersDialogContent = <Container>
		{ props.channels.length === 0
			? <Typography>There are no channels to delete!</Typography>
			: props.channels.map(channel =>
				<RemovableChannels
					key={ channel.id }
					channelName={ channel.name }
					channelId={ channel.id }
					onRemovableChannelIds={ props.onRemovableChannelIds }
				/>
			) }
	</Container>;

	const channelClustersDialogActions = <Box className={ classes["action-container"] }>
		<CustomButton
			disabled={ isLoading }
			type="submit">
			{ isLoading ? <CustomCircularProgressBar/> : "Apply" }
		</CustomButton>
		<Button className={ classes["cancel-button"] } onClick={ props.onClose }>Cancel</Button>
	</Box>;

	return <CustomDialog
		open={ props.open }
		onClose={ props.onClose }
		title="Channels:"
		customActions={ channelClustersDialogActions }
		customContent={ channelClustersDialogContent }
		handleSubmit={ handleSubmit }
	/>;
};

export default RemoveChannelDialog;