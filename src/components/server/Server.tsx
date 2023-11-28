import { Avatar, Box, Button, Container, Divider, ListItem, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { stringAvatar } from "./avatarUtils.ts";

import ratatoskrIcon from "./../../assets/ratatoskr.png";
import testIcon from "./../../assets/ivan2.jpg";
import girl from "./../../assets/girlj.png";
import catNoirIcon from "./../../assets/cat_noirj.png";
// import frog from "./../../assets/frog.jpg";
// import creature from "./../../assets/creature.png";
// import catWizardIcon from "./../../assets/catWizard.png";
// import someLogo from "./../../assets/someLogo.png";
// import amuIcon from "./../../assets/amu.png";
// import girlRestingIcon from "./../../assets/girlResting.jpg";
// import ibuLogo from "./../../assets/ibuLogo.png";
import classes from './Server.module.css';
import CustomTooltip from "../ui/CustomTooltip.tsx";
import { useState } from "react";
import AddServerDialogForm from "../add_server_dialog/AddServerDialogForm.tsx";

const Server = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return <Container className={ classes['scrollable-container'] }>
		<Stack className={ classes.stack } direction="column" spacing={ 0 }>
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
			<ListItem>
				<Box>
					<Button>
						<CustomTooltip title="Ivan Mijić" placement="right">
							<Avatar
								className={ classes.avatar }
								{ ...stringAvatar('Ivan Mijić') }
								alt="Ivan Mijić"
								src={ testIcon }
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>
			<ListItem>
				<Box>
					<Button>
						<CustomTooltip title="Amna Kolić" placement="right">
							<Avatar
								className={ classes.avatar }
								{ ...stringAvatar('Amna Kolić') }
								alt="Amna Kolić"
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>
			<ListItem>
				<Box>
					<Button>
						<CustomTooltip title="CatNoir" placement="right">
							<Avatar
								className={ classes.avatar }
								{ ...stringAvatar('CatNoir') }
								alt="CatNoir"
								src={ catNoirIcon }
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>
			<ListItem>
				<Box>
					<Button>
						<CustomTooltip title="Ivan Mijić" placement="right">
							<Avatar
								className={ classes.avatar }
								{ ...stringAvatar('Ivan Mijić') }
								alt="Ivan Mijić"
							>
							</Avatar>
						</CustomTooltip>
					</Button>
				</Box>
			</ListItem>
			<ListItem>
				<CustomTooltip title="Chill Server" placement="right">
					<Box>
						<Button>
							<Avatar
								className={ classes.avatar }
								{ ...stringAvatar('Ivan Mijić') }
								alt="Chill Server"
								src={ girl }
							>
							</Avatar>
						</Button>
					</Box>
				</CustomTooltip>
			</ListItem>
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Creature Server" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Creature Server') }*/ }
			{/*			alt="Creature Server"*/ }
			{/*			src={ creature }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Froggy Server" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Froggy Server') }*/ }
			{/*			alt="Froggy Server"*/ }
			{/*			src={ frog }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Cat Wizards" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Cat Wizards') }*/ }
			{/*			alt="Cat Wizards"*/ }
			{/*			src={ catWizardIcon }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Bit Company" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Bit Company') }*/ }
			{/*			alt="Bit Company"*/ }
			{/*			src={ someLogo }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Amu Enjoyers" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Amu Enjoyers') }*/ }
			{/*			alt="Amu Enjoyers"*/ }
			{/*			src={ amuIcon }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Studdy Hall" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Study Hall') }*/ }
			{/*			alt="Study Hall"*/ }
			{/*			src={ girlRestingIcon }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
			{/*<ListItem>*/ }
			{/*	<CustomTooltip title="Burch University" placement="right">*/ }
			{/*		<Avatar*/ }
			{/*			className={ classes.avatar }*/ }
			{/*			{ ...stringAvatar('Burch University') }*/ }
			{/*			alt="Burch University"*/ }
			{/*			src={ ibuLogo }*/ }
			{/*		>*/ }
			{/*		</Avatar>*/ }
			{/*	</CustomTooltip>*/ }
			{/*</ListItem>*/ }
		</Stack>
	</Container>;
};

export default Server;
