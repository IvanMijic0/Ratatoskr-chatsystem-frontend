import { Avatar, Box, Paper, Typography } from "@mui/material";

import classes from "./UserPanel.module.css";
import { stringAvatar } from "../../servers/ts/avatarUtils.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import { selectUser } from "../../../store/slice/user-slice/user-slice.ts";
import { fetchUserSpecific } from "../../../store/action/user-action.ts";
import { useEffect } from "react";

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