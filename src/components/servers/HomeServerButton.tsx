import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import ratatoskrIcon from "../../assets/ratatoskr.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { setServerInfo } from "../../store/action/server-action.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";

const HomeServerButton = () => {
	const selectedServerId = useAppSelector(selectCurrentServerId);
	const dispatch = useAppDispatch();
	const isSelected = selectedServerId === "0000-0000";

	const handleClick = () => {
		dispatch(setServerInfo({ serverName: "Homepage", serverId: "0000-0000" }));
	};

	return (
		<Box>
			<Button onClick={ handleClick }>
				<CustomTooltip title="Direct Messages" placement="right">
					<Avatar
						className={ `${ classes["homepage-avatar"] } ${ isSelected ? classes.selected : "" }` }
						alt="Ratatoskr"
						src={ ratatoskrIcon }
					></Avatar>
				</CustomTooltip>
			</Button>
		</Box>
	);
};

export default HomeServerButton;
