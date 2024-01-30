import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../../UI/CustomTooltip.tsx";
import { useNavigate, useParams } from "react-router-dom";

import { stringAvatar } from "../../../utils";
import { useQueryClient } from "react-query";
import { Server } from "../../../types";
import classes from "../ServersList/ServersList.module.css";

const ServerButton = ( { id, firstClusterId, firstChannelId, name, avatarIconUrl }: Server ) => {
	const { serverId: selectedServerId } = useParams();
	const queryClient = useQueryClient();
	const isSelected = selectedServerId === id;
	const navigate = useNavigate();

	const handleClick = async () => {
		navigate(`/servers/${ id }/${ firstClusterId }/${ firstChannelId }`);
		try {
			await queryClient.invalidateQueries(['server', id]);
			await queryClient.invalidateQueries(['channelClusters', id]);
		} catch (error) {
			console.log("Failed to fetch server data " + error);
			throw error;
		}
	};

	return <Box className={ classes["avatar-container"] }>
		<Button onClick={ handleClick }>
			<CustomTooltip title={ name } placement="right">
				<Avatar
					{ ...stringAvatar(name) }
					className={ `${ classes.avatar } ${ isSelected ? classes.selected : '' }` }
					alt={ name }
					src={ avatarIconUrl }
				/>
			</CustomTooltip>
		</Button>
		<Box className={ `${ classes["avatar-dot"] } ${ isSelected ? classes.selected : '' }` }/>
	</Box>;
};

export default ServerButton;
