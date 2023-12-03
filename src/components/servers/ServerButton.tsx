import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";

const ServerButton = ( props: {
	serverId: string;
	serverName: string;
	avatarIconUrl: string;
	handleServerClick: ( serverInfo: { serverName: string; serverId: string } ) => void;
} ) => {
	const handleClick = () => {
		props.handleServerClick({ serverId: props.serverId, serverName: props.serverName });
	};

	return (
		<Box>
			<Button onClick={ handleClick }>
				<CustomTooltip title={ props.serverName } placement="right">
					<Avatar
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