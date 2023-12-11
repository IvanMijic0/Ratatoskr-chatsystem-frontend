import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import { stringAvatar } from "./ts/avatarUtils.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { setServerInfo } from "../../store/action/server-action.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";

const ServerButton = ( { serverId, serverName, avatarIconUrl }: {
	serverId: string;
	serverName: string;
	avatarIconUrl: string;
} ) => {
	const dispatch = useAppDispatch();
	const selectedServerId = useAppSelector(selectCurrentServerId);
	const isSelected = selectedServerId === serverId;

	const handleClick = () => {
		dispatch(setServerInfo({ serverName, serverId }));
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
