import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

import classes from "./DescriptionPane.module.css";
import { useParams } from "react-router-dom";
import { useServer } from "../../hooks";

export const ServerDescriptionPane = () => {
	const { serverId } = useParams();

	const { data: serverData } = useServer(serverId ?? '');


	return <Box className={ classes.backgrounds }>
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box className={ classes.header }>
						<Button className={ classes.button }>
							<Typography sx={ { textTransform: "none" } }>Details</Typography>
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
		<Box className={ classes.container }>
			{
				<>
					<img className={ classes.img } src={ serverData?.avatarIconUrl } alt="Friend avatar"/>
					<Typography className={ classes.username }>{ serverData?.name }</Typography>
				</>
			}
		</Box>
	</Box>;
};

export default ServerDescriptionPane;