import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { AddServerDialogForm } from "../AddServerDialog";
import { ServerButton } from "../ServerButton";
import { HomeServerButton } from "../HomeServerButton";
import { AddServerButton } from "../AddServerButton";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchServerInfoDataAction, selectServerInfoData, setCurrentServerInfo } from "../../../Store";
import classes from './ServersList.module.css';

const ServersList = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const serverData = useAppSelector(selectServerInfoData);

	const handleClickOpen = () => {
		dispatch(setCurrentServerInfo({ serverName: "Add Server", serverId: "1111-1111" }));
		setOpen(true);
	};

	const handleClose = () => {
		// For now, let's go back to homepage after adding a server...
		dispatch(setCurrentServerInfo({ serverName: "homepage", serverId: "0000-0000" }));
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

	return (
		<Container className={ classes['scrollable-container'] }>
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
		</Container>
	);
};

export default ServersList;
