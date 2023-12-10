import { Box, ListItemButton, ListItemText } from "@mui/material";
import classes from "./ChannelItem.module.css";
import TagIcon from "@mui/icons-material/Tag";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../../store/slice/server_slice/server-slice.ts";
import { selectCurrentChannelClusterId } from "../../../store/slice/channelClusters_slice/channelClusters-slice.ts";
import { fetchChannelData } from "../../../store/action/channel-action.ts";

const ChannelItem = ( props: { channelName: string; channelId: string; } ) => {

	const currentIds = {
		serverId: useAppSelector(selectCurrentServerId),
		channelClusterId: useAppSelector(selectCurrentChannelClusterId),
		channelId: props.channelId,
	};

	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(fetchChannelData(currentIds));
	};

	return <Box className={ classes["channel-actions-container"] }>
		<ListItemButton className={ classes["inner-channel-button"] } onClick={ handleClick }>
			<TagIcon className={ classes["channel-icon"] }/>
			<ListItemText primary={ props.channelName } primaryTypographyProps={ { fontSize: ".9rem" } }/>
		</ListItemButton>
	</Box>;
};

export default ChannelItem;