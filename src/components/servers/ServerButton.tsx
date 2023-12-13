import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import { stringAvatar } from "./ts/avatarUtils.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { useNavigate, useParams } from "react-router-dom";
import { selectServerInfoByServerId, setCurrentServerInfo } from "../../store/slice/server_slice/server-slice.ts";

const ServerButton = ( { serverId, serverName, avatarIconUrl }: {
	serverId: string;
	serverName: string;
	avatarIconUrl: string;
} ) => {
	const dispatch = useAppDispatch();
	const { serverId: selectedServerId } = useParams();
	const isSelected = selectedServerId === serverId;
	const { firstClusterId, firstChannelId } = useAppSelector(selectServerInfoByServerId(serverId))[0];
	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(setCurrentServerInfo({ serverName, serverId }));
		navigate(`/servers/${ serverId }/${ firstClusterId }/${ firstChannelId }`);
	};

	return <Box className={ classes["avatar-container"] }>
		<Button onClick={ handleClick }>
			<CustomTooltip title={ serverName } placement="right">
				<Avatar
					{ ...stringAvatar(serverName) }
					className={ `${ classes.avatar } ${ isSelected ? classes.selected : '' }` }
					alt={ serverName }
					src={ avatarIconUrl }
				/>
			</CustomTooltip>
		</Button>
		<Box className={ `${ classes["avatar-dot"] } ${ isSelected ? classes.selected : '' }` }/>
	</Box>;
};

export default ServerButton;
