import { ListItemButton, ListItemText } from "@mui/material";
import classes from "./ChannelItem.module.css";
import TagIcon from "@mui/icons-material/Tag";

const ChannelItem = ( props: { channelName: string } ) => {
	return <ListItemButton className={ classes["inner-channel-button"] }>
		<TagIcon className={ classes["channel-icon"] }/>
		<ListItemText primary={ props.channelName } primaryTypographyProps={ { fontSize: ".9rem" } }/>
	</ListItemButton>;
};

export default ChannelItem;