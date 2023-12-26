import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { AddServerDialogForm } from "../AddServerDialog";
import { ServerButton } from "../ServerButton";
import { HomeServerButton } from "../HomeServerButton";
import { AddServerButton } from "../AddServerButton";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchServerInfoDataAction, selectServerInfoData } from "../../../store";
import classes from './ServersList.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const ServersList = () => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const serverData = useAppSelector(selectServerInfoData);
	const navigate = useNavigate();
	const url = useLocation().pathname;

	const handleClickOpen = () => {
		navigate('/home/add-server');
		setTimeout(() => {
		}, 100);
	};

	const handleClose = () => {
		navigate('/home');
		setOpen(false);
	};

	const fetchServerInfoData = useCallback(async () => {
		dispatch(fetchServerInfoDataAction());
	}, [dispatch]);

	useEffect(() => {
		try {
			!open && fetchServerInfoData();
		} catch (error) {
			console.log("Could not fetch ServersList info data: " + error);
			throw error;
		}
	}, [fetchServerInfoData, open]);

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
			{ serverData.map(( server: { id: string; name: string; avatarIconUrl: string; } ) => (
				<ListItem key={ server.id }>
					<ServerButton
						serverId={ server.id }
						serverName={ server.name }
						avatarIconUrl={ server.avatarIconUrl }
					/>
				</ListItem>
			)) }
		</Stack>
	</Container>;
};

export default ServersList;
