import { Avatar, Box, Button, Container, Divider, ListItem, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from "react";

import ratatoskrIcon from "./../../assets/ratatoskr.png";
import classes from './Server.module.css';
import CustomTooltip from "../ui/CustomTooltip.tsx";
import AddServerDialogForm from "../add_server_dialog/AddServerDialogForm.tsx";
import IServerInfoLoaderData from "./IServerInfoLoaderData.ts";
import axiosInstance from "../../configuration/axios-instance.ts";


const Server = () => {
	const [serverInfoData, setServerInfoData] = useState<IServerInfoLoaderData[]>([]);
	const [open, setOpen] = useState(false);


	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const fetchServerInfoData = useCallback(async () => {
		const response = ( await axiosInstance.get('server/summary') ).data;
		setServerInfoData(response);
	}, []);

	useEffect(() => {
		try {
			!open && fetchServerInfoData();
		} catch (error) {
			console.log("Could not fetch server info data: " + error);
			throw error;
		}
	}, [fetchServerInfoData, open]);


	return <Container className={ classes['scrollable-container'] }>
		<Stack className={ classes.stack } direction="column">
			<ListItem>
				<Box>
					<Button>
						<CustomTooltip title="Direct Messages" placement="right">
							<Avatar
								className={ classes['homepage-avatar'] }
								alt="Ratatoskr"
								src={ ratatoskrIcon }
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>
			<ListItem>
				<Box>
					<Button onClick={ handleClickOpen }>
						<CustomTooltip title="Add Server" placement="right">
							<Avatar className={ classes['add-icon'] }>
								<AddIcon sx={ { color: "whitesmoke" } }/>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
				<AddServerDialogForm open={ open } onClose={ handleClose }/>
			</ListItem>
			<Divider className={ classes.divider } variant="middle" flexItem/>
			{ serverInfoData.map(server => <ListItem key={ server.id }>
				<Box>
					<Button>
						<CustomTooltip title={ server.name } placement="right">
							<Avatar
								className={ classes.avatar }
								alt={ server.name }
								src={ server.avatarIconUrl }
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>)
			}
		</Stack>
	</Container>;
};

export default Server;
