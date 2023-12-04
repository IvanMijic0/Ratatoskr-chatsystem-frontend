import { Avatar, Box, Button } from "@mui/material";
import CustomTooltip from "../ui/CustomTooltip.tsx";
import classes from "./servers_/Servers.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../hooks/redux-hooks.ts";
import { selectCurrentServerId } from "../../store/slice/server_slice/server-slice.ts";

const AddServerButton = ( props: { onClick: () => void } ) => {
	const selectedServerId = useAppSelector(selectCurrentServerId);
	const isSelected = selectedServerId === "1111-1111";

	return <Box>
		<Button onClick={ props.onClick }>
			<CustomTooltip title="Add Servers" placement="right">
				<Avatar className={ `${ classes["add-icon"] } ${ isSelected ? classes.selected : "" }` }>
					<AddIcon sx={ { color: "whitesmoke" } }/>
				</Avatar>
			</CustomTooltip>
		</Button>
	</Box>;
};

export default AddServerButton;