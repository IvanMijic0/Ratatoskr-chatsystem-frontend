import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from "./RemoveChannelButon.module.css";

const RemoveChannelButton = () => {
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

	return <Checkbox
		className={ classes.checkbox }
		{ ...label }
		icon={ <DeleteOutlineOutlinedIcon className={ classes["channel-remove-icon-outline"] }/> }
		checkedIcon={ <DeleteIcon className={ classes["channel-remove-icon-filled"] }/> }
	/>;
};

export default RemoveChannelButton;