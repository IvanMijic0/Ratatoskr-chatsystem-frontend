import UserInfo from "./UserInfo.ts";

type CustomAutoCompleteProps = {
	onInputChange: any;
	value: string;
	placeholder?: string;
	className?: string;
	disablePortal?: boolean;
	id?: string;
	options: UserInfo[];
	label?: string;
}

export default CustomAutoCompleteProps;
