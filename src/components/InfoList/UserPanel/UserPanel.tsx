import { Avatar, Badge, Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectUser, selectUserStatus, UserAction } from "../../../store";
import { stringAvatar } from "../../../utils";
import { UserStatus } from "../../../enums";
import { CustomTooltip } from "../../UI";
import classes from "./UserPanel.module.css";

const UserPanel = () => {
	const userInfo = useAppSelector(selectUser);
	const userStatus = useAppSelector(selectUserStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(UserAction.fetchUserSpecific());
	}, [dispatch]);

	return <Paper className={ classes["user-panel"] }>
		<Box className={ classes["user-options-container"] }>
			<Badge color={ userStatus === UserStatus.ONLINE ? 'success' : 'error' } variant="dot">
				<Avatar  { ...stringAvatar(userInfo.fullName) } src={ userInfo.avatarUrl } alt={ userInfo.fullName }/>
			</Badge>
			<Box className={ classes["user-details-container"] }>
				<CustomTooltip title={ userInfo.username } placement="top-start">
					<Typography className={ classes['full-name'] }>{ userInfo.fullName }</Typography>
				</CustomTooltip>
			</Box>
			{/*<IconButton className={ classes['icon-button'] }>*/ }
			{/*	<SettingsIcon className={ classes.icon }/>*/ }
			{/*</IconButton>*/ }
		</Box>
	</Paper>;
};

export default UserPanel;