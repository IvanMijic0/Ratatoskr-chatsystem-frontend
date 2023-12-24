import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../../UI/CustomTooltip.tsx";
import ratatoskrIcon from "../../../assets/ratatoskr.png";
import { useAppDispatch } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { resetChannelClustersState, setCurrentServerInfo } from "../../../store";
import classes from "../ServersList/ServersList.module.css";

const HomeServerButton = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const currentUrl = location.pathname.slice(1);
	const isSelected = currentUrl === "home";

	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(resetChannelClustersState());
		navigate("/home");
		dispatch(setCurrentServerInfo({ serverName: "Homepage", serverId: "home" }));
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
