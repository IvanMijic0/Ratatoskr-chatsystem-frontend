import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../../UI/CustomTooltip.tsx";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../../hooks";
import { selectCurrentServerId } from "../../../Store";
import classes from "../ServersList/ServersList.module.css";

const AddServerButton = ( props: { onClick: () => void } ) => {
	const selectedServerId = useAppSelector(selectCurrentServerId);
	const isSelected = selectedServerId === "1111-1111";

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