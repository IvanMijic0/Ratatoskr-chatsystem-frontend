import { Dispatch, SetStateAction } from "react";

type UserServiceProps = {
	setAllUsers: Dispatch<SetStateAction<any[]>>;
	setFilteredUsers: Dispatch<SetStateAction<any[]>>;
}

export default UserServiceProps;