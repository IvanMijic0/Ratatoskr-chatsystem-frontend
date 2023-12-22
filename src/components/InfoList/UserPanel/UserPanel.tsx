import { Avatar, Box, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUserSpecific, selectUser } from "../../../Store";
import { useEffect } from "react";
import { stringAvatar } from "../../../utils";
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
				<Typography className={ classes.username }>{ userInfo.fullName }</Typography>
				<Typography className={ classes["full-name"] }>{ userInfo.username }</Typography>
			</Box>
		</Box>
	</Paper>;
};

export default UserPanel;