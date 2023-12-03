import { Container, Divider, ListItem, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import classes from './Servers.module.css';
import AddServerDialogForm from "../../add_server_dialog/AddServerDialogForm.tsx";
import IServerInfoLoaderData from "../ts/IServerInfoLoaderData.ts";
import axiosInstance from "../../../configuration/axios-instance.ts";
import ServerButton from "../ServerButton.tsx";
import HomeServer from "../HomeServerButton.tsx";
import AddServerButton from "../AddServerButton.tsx";

const Servers = ( props: { setServerInfo: ( arg0: any ) => void } ) => {
	const [serverInfoData, setServerInfoData] = useState<IServerInfoLoaderData[]>([]);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleServerClick = ( clickedServerInfo: any ) => {
		props.setServerInfo(clickedServerInfo);
	};

	const fetchServerInfoData = useCallback(async () => {
		const response = ( await axiosInstance.get('server/summary') ).data;
		setServerInfoData(response);
	}, []);

	useEffect(() => {
		try {
			!open && fetchServerInfoData();
		} catch (error) {
			console.log("Could not fetch servers_ info data: " + error);
			throw error;
		}
	}, [fetchServerInfoData, open]);


	return <Container className={ classes['scrollable-container'] }>
		<Stack className={ classes.stack } direction="column">
			<ListItem>
				<HomeServer/>
			</ListItem>
			<ListItem>
				<AddServerButton onClick={ handleClickOpen }/>
				<AddServerDialogForm open={ open } onClose={ handleClose }/>
			</ListItem>
			<Divider className={ classes.divider } variant="middle" flexItem/>
			{ serverInfoData.map(server => <ListItem key={ server.id }>
				<ServerButton
					serverId={ server.id }
					serverName={ server.name }
					avatarIconUrl={ server.avatarIconUrl }
					handleServerClick={ handleServerClick }
				/>
			</ListItem>)
			}
		</Stack>
	</Container>;
};

export default Servers;
