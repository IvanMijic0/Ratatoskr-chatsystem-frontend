interface IOption {
	label: string;
}

interface ICustomAutoCompleteProps {
	className?: string;
	disablePortal?: boolean;
	id?: string;
	options: IOption[];
	label?: string;
}

export default ICustomAutoCompleteProps;