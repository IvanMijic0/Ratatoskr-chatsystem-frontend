interface IOption {
	label: string;
}

interface ICustomAutoCompleteProps {
	placeHolder?: string;
	className?: string;
	disablePortal?: boolean;
	id?: string;
	options: IOption[];
	label?: string;
}

export default ICustomAutoCompleteProps;