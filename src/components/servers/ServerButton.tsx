import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import { stringAvatar } from "./ts/avatarUtils.ts";
import { useAppDispatch } from "../../hooks/redux-hooks.ts";
import { setServerInfo } from "../../store/action/server-action.ts";

const ServerButton = ( props: {
	serverId: string;
	serverName: string;
	avatarIconUrl: string;
} ) => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(setServerInfo({ serverName: props.serverName, serverId: props.serverId }));
	};

	return (
		<Box>
			<Button onClick={ handleClick }>
				<CustomTooltip title={ props.serverName } placement="right">
					<Avatar
						{ ...stringAvatar(props.serverName) }
						className={ classes.avatar }
						alt={ props.serverName }
						src={ props.avatarIconUrl }
					/>
				</CustomTooltip>
			</Button>
		</Box>
	);
};

export default ServerButton;