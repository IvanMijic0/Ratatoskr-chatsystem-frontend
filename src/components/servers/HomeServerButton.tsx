import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import ratatoskrIcon from "../../assets/ratatoskr.png";

const HomeServerButton = () => {
	return <Box>
		<Button>
			<CustomTooltip title="Direct Messages" placement="right">
				<Avatar
					className={ classes["homepage-avatar"] }
					alt="Ratatoskr"
					src={ ratatoskrIcon }
				>
				</Avatar>
			</CustomTooltip>
		</Button>
	</Box>;
};

export default HomeServerButton;