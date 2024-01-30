import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import useFriend from "../../hooks/useFriend.ts";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../store";
import classes from "./DescriptionPane.module.css";

export const HomeDescriptionPane = () => {
	const { friendId } = useParams();
	const { username, avatarUrl } = useAppSelector(selectUser);

	const { data: friendData } = useFriend(friendId);

	return <Box className={ classes.backgrounds }>
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box className={ classes.header }>
						<Button className={ classes.button }>
							<Typography sx={ { textTransform: "none" } }>Info</Typography>
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
		<Box className={ classes.container }>
			{ friendData
				? <>
					<img className={ classes.img } src={ friendData.avatarImageUrl } alt="Friend avatar"/>
					<Typography className={ classes.username }>{ friendData.username }</Typography>
				</>
				: <>
					<img className={ classes.img } src={ avatarUrl } alt="Friend avatar"/>
					<Typography className={ classes.username }>{ username }</Typography>
				</>
			}
		</Box>
	</Box>;
};

export default HomeDescriptionPane;