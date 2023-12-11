import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import classes from "./TopAppBar.module.css";

export const TopAppBar = () => {
	const pages = ['Online', 'All', 'Pending'];

	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Diversity3Icon sx={ { display: { xs: 'none', md: 'flex' }, mr: 1 } }/>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={ {
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						color: 'inherit',
						textDecoration: 'none',
					} }
				>
					Friends
				</Typography>
				<Box className={ classes.options }>
					{ pages.map(page => (
						<Button sx={ { textTransform: "none" } } className={ classes.option }>
							<Typography>{ page }</Typography>
						</Button>
					)) }
					<Button sx={ { textTransform: "none" } } className={ classes["add-friend-button"] }>
						<Typography className={ classes["add-friend-text"] }>Add Friend</Typography>
					</Button>
				</Box>
			</Toolbar>
		</Container>
	</AppBar>;
};

export default TopAppBar;