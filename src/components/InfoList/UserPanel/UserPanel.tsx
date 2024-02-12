import { useEffect, useState } from "react";
import { Avatar, Badge, Box, IconButton, MenuItem, Paper, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, useLogout } from "../../../hooks";
import { selectUser, selectUserStatus, UserAction } from "../../../store";
import { stringAvatar } from "../../../utils";
import { UserStatus } from "../../../enums";
import { CustomMenu, CustomTooltip } from "../../UI";
import classes from "./UserPanel.module.css";

const UserPanel = () => {
	const userInfo = useAppSelector(selectUser);
	const userStatus = useAppSelector(selectUserStatus);
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { mutate: mutateLogout } = useLogout();

	useEffect(() => {
		dispatch(UserAction.fetchUserSpecific());
		console.log(userStatus);
	}, [dispatch]);

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleLogout = () => {
		console.log("Logging out...");
		mutateLogout({ dispatch, navigate });
	};

	return (
		<Paper className={classes["user-panel"]}>
			<Box className={classes["user-options-container"]}>
				<Badge color={userStatus === UserStatus.ONLINE ? 'success' : 'error'} variant="dot">
					<Avatar {...stringAvatar(userInfo.fullName)} src={userInfo.avatarUrl} alt={userInfo.fullName} />
				</Badge>
				<Box className={classes["user-details-container"]}>
					<CustomTooltip title={userInfo.username} placement="top-start">
						<Typography className={classes['full-name']}>{userInfo.fullName}</Typography>
					</CustomTooltip>
				</Box>
				<IconButton className={classes['icon-button']} onClick={handleMenuOpen}>
					<SettingsIcon className={classes.icon} />
				</IconButton>
				<CustomMenu
					anchorEl={menuAnchorEl}
					open={Boolean(menuAnchorEl)}
					onClose={handleMenuClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
				>
					<MenuItem onClick={handleLogout} className={classes["menu-item"]}>Log out</MenuItem>
				</CustomMenu>
			</Box>
		</Paper>
	);
};

export default UserPanel;
