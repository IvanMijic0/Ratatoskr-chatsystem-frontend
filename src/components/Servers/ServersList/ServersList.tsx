import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { memo, useCallback, useEffect, useState } from "react";
import { AddServerDialogForm } from "../AddServerDialog";
import { ServerButton } from "../ServerButton";
import { HomeServerButton } from "../HomeServerButton";
import { AddServerButton } from "../AddServerButton";
import { useServers } from "../../../hooks";
import classes from './ServersList.module.css';
import { Server } from "../../../types";
import { CustomCircularProgressBar } from "../../UI";

const ServersList = memo(() => {
	const [open, setOpen] = useState(false);
	const { data: serverData, isLoading } = useServers();

	const navigate = useNavigate();
	const url = useLocation().pathname;

	const handleClickOpen = useCallback(() => {
		navigate('/home/add-server');
		setTimeout(() => {
		}, 100);
	}, [navigate]);

	const handleClose = useCallback(() => {
		navigate('/home');
		setOpen(false);
	}, [navigate]);

	useEffect(() => {
		url.endsWith("/add-server") && setOpen(true);
	}, [url]);
	
	return <Container className={ classes['scrollable-container'] }>
		<Stack className={ classes.stack } direction="column">
			<ListItem>
				<HomeServerButton/>
			</ListItem>
			<ListItem>
				<AddServerButton onClick={ handleClickOpen }/>
				<AddServerDialogForm open={ open } onClose={ handleClose }/>
			</ListItem>
			<Divider className={ classes.divider } variant="middle" flexItem/>
			{ isLoading
				? <ListItem className={ classes['loading-bar'] }>
					<CustomCircularProgressBar/>
				</ListItem>
				: serverData?.map(( server: Server ) => (
					<ListItem key={ server.id }>
						<ServerButton
							id={ server.id }
							name={ server.name }
							avatarIconUrl={ server.avatarIconUrl }
							firstClusterId={ server.firstClusterId }
							firstChannelId={ server.firstChannelId }
						/>
					</ListItem>
				)) }
		</Stack>
	</Container>;
});


export default ServersList;
