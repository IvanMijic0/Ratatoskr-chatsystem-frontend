import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../../UI/CustomTooltip.tsx";
import AddIcon from "@mui/icons-material/Add";
import classes from "../ServersList/ServersList.module.css";
import { useLocation } from "react-router-dom";

const AddServerButton = ( props: { onClick: () => void } ) => {
	const url = useLocation().pathname;
	const isSelected = url.endsWith("/add-server");

	return <Box>
		<Button onClick={ props.onClick }>
			<CustomTooltip title="Add ServersList" placement="right">
				<Avatar className={ `${ classes["add-icon"] } ${ isSelected ? classes.selected : "" }` }>
					<AddIcon sx={ { color: "whitesmoke" } }/>
				</Avatar>
			</CustomTooltip>
		</Button>
	</Box>;
};

export default AddServerButton;