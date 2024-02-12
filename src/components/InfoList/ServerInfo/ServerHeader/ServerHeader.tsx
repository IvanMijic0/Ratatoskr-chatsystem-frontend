import {
	Box,
	Button,
	CircularProgress,
	Container,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, MouseEvent, useState } from "react";

import {
	useAllMembersInServer,
	useAppSelector,
	useCreateChannelCluster,
	useCreateMembersToServer,
	useDeleteServer,
	useFriends,
	useInput,
	useSnackbar
} from "../../../../hooks";
import { channelClusterTextField, errorChannelClusterTextField } from "../FormInputs";
import { CustomButton, CustomDialog, CustomMenu, FriendItem } from "../../../UI";
import { channelClusterNameRegex } from "../../../../regex";
import { ServerHeaderProps, UserInfo } from "../../../../types";
import { selectUser } from "../../../../store";
import classes from "../ChannelClusters/ChannelsClusters.module.css";

const ServerHeader = ({ onClose, primary, ownerId, open, onClick }: ServerHeaderProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

	const { mutate: mutateCreateChannelCluster, isLoading } = useCreateChannelCluster();
	const channelClusterNameValidation = useInput(channelClusterNameRegex);
	const { mutate: mutateDeleteServer } = useDeleteServer();
	const { data: friendsData } = useFriends();
	const { _id } = useAppSelector(selectUser);
	const { showSnackbar } = useSnackbar();

	const { serverId } = useParams();

	const navigate = useNavigate();
	const { data: memberData } = useAllMembersInServer(serverId ?? '');
	const { mutate: mutateAddFriendAsMember } =
		useCreateMembersToServer({ serverId: serverId ?? '' });

	const filteredFriends = friendsData && friendsData.filter((friend) => !memberData?.some((member: UserInfo) => member._id === friend._id));

	const openMenu = Boolean(anchorEl);
	let dialogFormIsValid = false;

	if (channelClusterNameValidation.isValid) dialogFormIsValid = true;

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleAddFriendDialogOpen = () => {
		setOpenAddFriendDialog(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		channelClusterNameValidation.reset();
	};

	const handleAddFriendDialogClose = () => {
		setOpenAddFriendDialog(false);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		mutateCreateChannelCluster({
			serverId: serverId ?? '',
			channelClusterName: channelClusterNameValidation.value
		}, {
			onSuccess: () => {
				showSnackbar('Channel cluster created successfully.', 'success');
			},
			onError: (error) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
			}
		});
	};

	const handleDeleteServer = async () => {
		serverId && mutateDeleteServer(serverId, {
			onSuccess: () => {
				showSnackbar('Server deleted successfully.', 'success');
				navigate('/home');
			},
			onError: (error) => {
				error instanceof Error && showSnackbar(error.message, 'error');
			},
			onSettled: () => {
				onClose();
				handleClose();
			}
		});
	};

	const handleAddFriendAsServerMember = (userId: string | undefined) => {
		console.log("clicked");
		serverId && userId && mutateAddFriendAsMember({ serverId, userId });
	};

	const friendsListContent = filteredFriends && filteredFriends?.length > 0
		? <List className={classes['friends-list']}>
			{filteredFriends.map(friend => <ListItem key={friend._id}>
				<Button
					onClick={() => {
						handleAddFriendAsServerMember(friend._id);
						handleClose();
					}}>
					<FriendItem
						friendId={friend._id}
						friendUsername={friend.username}
						friendAvatarIconUrl={friend.avatarImageUrl}
					/>
				</Button>
			</ListItem>
			)}
		</List>
		: <Typography className={classes["menu-item"]}>
			No friends available to add...
		</Typography>;

	const channelClustersDialogContent = <Container className={classes['Form-content']}>
		{!channelClusterNameValidation.hasError
			? channelClusterTextField(
				channelClusterNameValidation.valueChangeHandler,
				channelClusterNameValidation.inputBlurHandler,
				channelClusterNameValidation.value)
			: errorChannelClusterTextField(
				channelClusterNameValidation.valueChangeHandler,
				channelClusterNameValidation.inputBlurHandler,
				channelClusterNameValidation.value
			)
		}
	</Container>;

	const channelClustersDialogActions = <Box className={classes['action-button-container']}>
		<CustomButton
			disabled={!dialogFormIsValid || isLoading}
			type="submit"
			className={classes['action-button']}>
			{isLoading ? <CircularProgress /> : "Add"}
		</CustomButton>
		<Button className={classes['action-button']} onClick={onClose}>Cancel</Button>
	</Box>;

	return <ListItem>
		<Button
			disabled={ownerId !== _id}
			className={classes["server-header-button"]}
			id="basic-button"
			aria-controls={openMenu ? 'basic-menu' : undefined}
			aria-haspopup="true"
			aria-expanded={openMenu ? 'true' : undefined}
			onClick={handleClick}>
			<ListItemText
				primary={primary}
				primaryTypographyProps={{ left: 0, fontSize: "1rem", fontWeight: "bold", color: "whitesmoke" }}
			/>
		</Button>
		<CustomMenu
			id="basic-menu"
			anchorEl={anchorEl}
			open={openMenu}
			onClose={handleClose}>
			<MenuItem
				className={classes["menu-item"]}
				onClick={() => {
					onClick();
					handleClose();
				}}>
				Add Cluster
			</MenuItem>
			<MenuItem
				className={classes["menu-item"]}
				onClick={() => {
					handleAddFriendDialogOpen();
					handleClose();
				}}>
				Add friend
			</MenuItem>
			<MenuItem className={classes["menu-item-del"]} onClick={handleDeleteServer}>
				Delete Server
			</MenuItem>
		</CustomMenu>

		<CustomDialog
			open={open}
			onClose={onClose}
			title="Enter Channel Cluster data:"
			customActions={channelClustersDialogActions}
			customContent={channelClustersDialogContent}
			handleSubmit={handleSubmit}
		/>

		<CustomDialog
			open={openAddFriendDialog}
			onClose={handleAddFriendDialogClose}
			title="Add Friend to Server:"
			customContent={friendsListContent}
		/>

	</ListItem>;
};

export default ServerHeader;