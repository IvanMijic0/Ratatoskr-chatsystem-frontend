import { Box, ListItemButton, ListItemText } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchChannelData, selectCurrentChannelClusterId, selectCurrentServerId } from "../../../../Store";
import { useNavigate } from "react-router-dom";
import classes from "./ChannelItem.module.css";

const ChannelItem = ( props: { channelName: string; channelId: string; } ) => {
	const currentIds = {
		serverId: useAppSelector(selectCurrentServerId),
		channelClusterId: useAppSelector(selectCurrentChannelClusterId),
		channelId: props.channelId,
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(fetchChannelData(currentIds));
		navigate(`/servers/${ currentIds.serverId }/${ currentIds.channelClusterId }/${ currentIds.channelId }`);
	};

	return <Box className={ classes["channel-actions-container"] }>
		<ListItemButton className={ classes["inner-channel-button"] } onClick={ handleClick }>
			<TagIcon className={ classes["channel-icon"] }/>
			<ListItemText primary={ props.channelName } primaryTypographyProps={ { fontSize: ".9rem" } }/>
		</ListItemButton>
	</Box>;
};

export default ChannelItem;