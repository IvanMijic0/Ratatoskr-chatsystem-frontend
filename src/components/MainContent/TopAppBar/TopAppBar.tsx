import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import classes from "./TopAppBar.module.css";
import { useNavigate } from "react-router-dom";

export const TopAppBar = () => {
	const navigate = useNavigate();

	const addFriendHandler = () => {
		navigate("/home/add-friend");
	};

	const allFriendHandler = () => {
		navigate("/home/all-friends");
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
					<Button className={ classes.option }>
						<Typography sx={ { textTransform: "none" } }>Online</Typography>
					</Button>
					<Button className={ classes.option } onClick={ allFriendHandler }>
						<Typography sx={ { textTransform: "none" } }>All</Typography>
					</Button>
					<Button className={ classes.option }>
						<Typography sx={ { textTransform: "none" } }>Pending</Typography>
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