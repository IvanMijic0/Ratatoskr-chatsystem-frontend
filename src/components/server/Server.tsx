import { Avatar, Box, Button, Container, Divider, ListItem, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import ratatoskrIcon from "./../../assets/ratatoskr.png";

import classes from './Server.module.css';
import CustomTooltip from "../ui/CustomTooltip.tsx";
import { useState } from "react";
import AddServerDialogForm from "../add_server_dialog/AddServerDialogForm.tsx";
import { useLoaderData } from "react-router-dom";
import IServerInfoLoaderData from "./IServerInfoLoaderData.ts";

const Server = () => {
	const serverInfoLoaderData: IServerInfoLoaderData[] = useLoaderData() as IServerInfoLoaderData[];
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


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
			{ serverInfoLoaderData.map(server => <ListItem key={ server.id }>
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
