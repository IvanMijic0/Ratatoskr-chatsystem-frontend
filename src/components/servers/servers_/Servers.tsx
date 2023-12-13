import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import AddServerDialogForm from "../add_server_dialog/AddServerDialogForm.tsx";
import ServerButton from "../ServerButton.tsx";
import HomeServer from "../HomeServerButton.tsx";
import AddServerButton from "../AddServerButton.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import { selectServerInfoData, setCurrentServerInfo } from "../../../store/slice/server_slice/server-slice.ts";
import { fetchServerInfoDataAction } from "../../../store/action/server-action.ts";
import classes from './Servers.module.css';

const Servers = () => {
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
			console.log("Could not fetch servers_ info data: " + error);
			throw error;
		}
	}, [fetchServerInfoData, open]);

	return (
		<Container className={ classes['scrollable-container'] }>
			<Stack className={ classes.stack } direction="column">
				<ListItem>
					<HomeServer/>
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

export default Servers;
