import { AppBar, Badge, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../../hooks";
import { selectNotificatiosExists } from "../../../store";
import { selectNotificationsLength } from "../../../store/slice/notification-slice.ts";
import classes from "./TopAppBar.module.css";

export const TopAppBar = () => {
	const [invisible, setInvisible] = useState(false);

	const notificationsExists = useAppSelector(selectNotificatiosExists);
	const notificationsLength = useAppSelector(selectNotificationsLength);
	const navigate = useNavigate();

	useEffect(() => {
		notificationsExists ? setInvisible(false) : setInvisible(true);
	}, [notificationsExists]);

	const onlineFriendsHandler = () => {
		navigate("/home/online-friends");
	};

	const allFriendHandler = () => {
		navigate("/home/all-friends");
	};

	const pendingFriendRequestsHandler = () => {
		navigate("/home/pending-requests");
	};

	const addFriendHandler = () => {
		navigate("/home/add-friend");
	};

	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Diversity3Icon sx={ { display: { xs: 'none', md: 'flex' }, mr: 1 } }/>
				<Typography
					variant="h6"
					noWrap
					sx={ {
						mr: 2,
						fontFamily: 'monospace',
						fontWeight: 700,
						textDecoration: 'none',
					} }
				>
					Friends
				</Typography>
				<Box className={ classes.options }>
					<Button className={ classes.option } onClick={ onlineFriendsHandler }>
						<Typography sx={ { textTransform: "none" } }>Online</Typography>
					</Button>
					<Button className={ classes.option } onClick={ allFriendHandler }>
						<Typography sx={ { textTransform: "none" } }>All</Typography>
					</Button>
					<Button className={ classes.option } onClick={ pendingFriendRequestsHandler }>
						<Badge badgeContent={ notificationsLength } color="success" invisible={ invisible }>
							<Typography sx={ { textTransform: "none" } }>Pending</Typography>
						</Badge>
					</Button>
					<Button
						sx={ { textTransform: "none" } }
						className={ classes["add-friend-button"] }
						onClick={ addFriendHandler }>
						<Typography className={ classes["add-friend-text"] }>Add Friend</Typography>
					</Button>
				</Box>
			</Toolbar>
		</Container>
	</AppBar>;
};

export default TopAppBar;