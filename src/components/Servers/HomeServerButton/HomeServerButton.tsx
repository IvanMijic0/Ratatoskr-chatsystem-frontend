import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../../UI/CustomTooltip.tsx";
import ratatoskrIcon from "../../../assets/ratatoskr.png";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "../ServersList/ServersList.module.css";

const HomeServerButton = () => {
	const location = useLocation();
	const currentUrl = location.pathname;
	const isSelected = currentUrl.startsWith("/home");

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/home/online-friends");
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
