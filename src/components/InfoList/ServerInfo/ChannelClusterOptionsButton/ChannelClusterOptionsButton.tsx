import { IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { MouseEventHandler } from "react";

import classes from "./ChannelClusterOptionsButton.module.css";

const ChannelClusterOptionsButton = ( props: {
	handleMenuOpen: MouseEventHandler<HTMLButtonElement> | undefined,
	disabled: boolean
} ) => {
	return props.disabled
		? <></>
		: <IconButton onClick={ props.handleMenuOpen } disabled={ props.disabled }>
			<SettingsIcon className={ classes["cluster-icon"] }/>
		</IconButton>;
};

export default ChannelClusterOptionsButton;