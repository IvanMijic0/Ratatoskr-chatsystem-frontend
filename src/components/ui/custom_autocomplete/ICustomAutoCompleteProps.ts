import IUserInfo from "../../main_content/friend_content/IUserInfo.ts";

interface ICustomAutoCompleteProps {
	onInputChange: any;
	value: string;
	placeHolder?: string;
	className?: string;
	disablePortal?: boolean;
	id?: string;
	options: IUserInfo[];
	label?: string;
}

export default ICustomAutoCompleteProps;