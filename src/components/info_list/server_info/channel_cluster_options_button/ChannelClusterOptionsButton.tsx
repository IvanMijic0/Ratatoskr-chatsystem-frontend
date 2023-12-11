import { IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

import classes from "./ChannelClusterOptionsButton.module.css";
import { MouseEventHandler } from "react";

const ChannelClusterOptionsButton = ( props: { handleMenuOpen: MouseEventHandler<HTMLButtonElement> | undefined } ) => {
	return <IconButton onClick={ props.handleMenuOpen }>
		<SettingsIcon className={ classes["cluster-icon"] }/>
	</IconButton>;
};

export default ChannelClusterOptionsButton;