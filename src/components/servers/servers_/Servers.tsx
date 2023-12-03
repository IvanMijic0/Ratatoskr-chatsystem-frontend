import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import AddServerDialogForm from "../add_server_dialog/AddServerDialogForm.tsx";
import ServerButton from "../ServerButton.tsx";
import HomeServer from "../HomeServerButton.tsx";
import AddServerButton from "../AddServerButton.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.ts";
import { selectServerInfoData } from "../../../store/slice/server_slice/server-slice.ts";
import { fetchServerInfoDataAction } from "../../../store/action/server-action.ts";
import classes from './Servers.module.css';

const Servers = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const serverData = useAppSelector(selectServerInfoData);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
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
				{ serverData.map(( server ) => (
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
