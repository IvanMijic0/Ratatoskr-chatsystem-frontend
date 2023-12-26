import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUserSpecific, selectUser } from "../../../store";
import { useEffect } from "react";
import { stringAvatar } from "../../../utils";
import { CustomTooltip } from "../../UI";
import classes from "./UserPanel.module.css";

const UserPanel = () => {
	const userInfo = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserSpecific());
	}, [dispatch]);

	return <Paper className={ classes["user-panel"] }>
		<Box className={ classes["user-options-container"] }>
			<Avatar  { ...stringAvatar(userInfo.fullName) } src={ userInfo.avatarUrl } alt={ userInfo.fullName }/>
			<Box className={ classes["user-details-container"] }>
				<CustomTooltip title={ userInfo.username } placement="top-start">
					<Typography className={ classes['full-name'] }>{ userInfo.fullName }</Typography>
				</CustomTooltip>
			</Box>
			<IconButton className={ classes['icon-button'] }>
				<SettingsIcon className={ classes.icon }/>
			</IconButton>
		</Box>
	</Paper>;
};

export default UserPanel;