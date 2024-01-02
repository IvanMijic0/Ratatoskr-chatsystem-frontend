import { Box, Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { CustomButton, CustomCircularProgressBar, CustomDialog } from "../../../UI";
import { useDeleteChannels, useSnackBar } from "../../../../hooks";
import { RemoveChannelDialogProps } from "../../../../types";
import { RemovableChannels } from "../RemovableChannels";
import classes from "./RemoveChannelDialog.module.css";

export const RemoveChannelDialog
	= ( {
			open,
			onClose,
			channels,
			removableChannelIds,
			clusterId,
			onRemovableChannelIds
		}: RemoveChannelDialogProps ) => {

	const { mutate: mutateDeleteChannels, isLoading } = useDeleteChannels();
	const { serverId } = useParams();
	const { showSnackbar } = useSnackBar();

	const handleSubmit = async ( event: { preventDefault: () => void; } ) => {
		event.preventDefault();

		mutateDeleteChannels({
			removableChannelIds,
			serverId: serverId!,
			channelClusterId: clusterId
		}, {
			onSuccess: () => {
				showSnackbar('Channels deleted successfully!', 'success');
			},
			onError: ( error ) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
			}
		});
	};

	const channelClustersDialogContent = <Container>
		{ channels?.length === 0
			? <Typography>There are no channels to delete!</Typography>
			: channels?.map(channel =>
				<RemovableChannels
					key={ channel.id }
					channelName={ channel.name }
					channelId={ channel.id }
					onRemovableChannelIds={ onRemovableChannelIds }
				/>
			) }
	</Container>;

	const channelClustersDialogActions = <Box className={ classes["action-container"] }>
		<CustomButton
			disabled={ isLoading }
			type="submit">
			{ isLoading ? <CustomCircularProgressBar/> : "Apply" }
		</CustomButton>
		<Button className={ classes["cancel-button"] } onClick={ onClose }>Cancel</Button>
	</Box>;

	return <CustomDialog
		open={ open }
		onClose={ onClose }
		title="Channels:"
		customActions={ channelClustersDialogActions }
		customContent={ channelClustersDialogContent }
		handleSubmit={ handleSubmit }
	/>;
};

export default RemoveChannelDialog;