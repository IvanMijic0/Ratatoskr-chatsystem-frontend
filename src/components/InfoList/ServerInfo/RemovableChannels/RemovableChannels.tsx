import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "./RemovableChannels.module.css";

export const RemovableChannels = ( props: {
	channelName: string;
	channelId: string;
	onRemovableChannelIds: ( arg0: ( prevState: any ) => any[] ) => void
} ) => {
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

	const handleCheckboxClick = () => {
		props.onRemovableChannelIds(( prevState ) => {
			const newSet = new Set(prevState);

			newSet.has(props.channelId)
				? newSet.delete(props.channelId)
				: newSet.add(props.channelId);

			return Array.from(newSet);
		});
	};


	return <Box className={ classes["removable-channel-container"] }>
		<Typography className={ classes["channel-name"] }>{ props.channelName }</Typography>
		<Checkbox
			className={ classes.checkbox }
			{ ...label }
			icon={ <DeleteOutlineOutlinedIcon className={ classes["channel-remove-icon-outline"] }/> }
			checkedIcon={ <DeleteIcon className={ classes["channel-remove-icon-filled"] }/> }
			onClick={ handleCheckboxClick }
		/>
	</Box>;
};

export default RemovableChannels;