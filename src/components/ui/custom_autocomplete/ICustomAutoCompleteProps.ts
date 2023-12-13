interface IOption {
	username: string;
	label: string;
}

interface ICustomAutoCompleteProps {
	onInputChange: any;
	value: string;
	placeHolder?: string;
	className?: string;
	disablePortal?: boolean;
	id?: string;
	options: IOption[];
	label?: string;
}

export default ICustomAutoCompleteProps;