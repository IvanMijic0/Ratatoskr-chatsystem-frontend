import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import AddIcon from "@mui/icons-material/Add";

const AddServerButton = ( props: { onClick: () => void } ) => {
	return <Box>
		<Button onClick={ props.onClick }>
			<CustomTooltip title="Add Servers" placement="right">
				<Avatar className={ classes["add-icon"] }>
					<AddIcon sx={ { color: "whitesmoke" } }/>
				</Avatar>
			</CustomTooltip>
		</Button>
	</Box>;
};

export default AddServerButton;