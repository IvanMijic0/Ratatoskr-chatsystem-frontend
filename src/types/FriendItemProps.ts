import { ActionType } from "../enums";

type FriendItemProps = {
	currentUserUsername?: string;
	currentUserId?: string;
	friendId?: string;
	friendUsername: string;
	friendAvatarIconUrl?: string;
	actionType?: ActionType;
	description?: string;
}

export default FriendItemProps;