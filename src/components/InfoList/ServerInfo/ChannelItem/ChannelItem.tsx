import { Box, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";

import { Channel } from "../../../../types";
import classes from "./ChannelItem.module.css";

const ChannelItem = ( { id, name, clusterId, }: Channel & { clusterId: string } ) => {
	const navigate = useNavigate();
	const { serverId } = useParams();

	const handleClick = () => {
		navigate(`/servers/${ serverId }/${ clusterId }/${ id }`);
	};

	return <Box className={ classes["channel-actions-container"] }>
		<ListItemButton className={ classes["inner-channel-button"] } onClick={ handleClick }>
			<TagIcon className={ classes["channel-icon"] }/>
			<ListItemText primary={ name } primaryTypographyProps={ { fontSize: ".9rem" } }/>
		</ListItemButton>
	</Box>;
};

export default ChannelItem;