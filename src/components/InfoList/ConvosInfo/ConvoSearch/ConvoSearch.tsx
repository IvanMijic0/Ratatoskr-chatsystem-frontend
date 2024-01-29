import classes from "./ConvoSearch.module.css";
import { CustomAutoComplete } from "../../../UI";

const ConvoSearch = () => {
	const friendsData = [
		{ label: 'Jahne Doe' },
		{ label: 'Rob Gayson' },
		{ label: 'Roadee McGee' },
		{ label: 'Satan Bosanac' },
	];

	return <CustomAutoComplete
		className={ classes.search }
		options={ friendsData }
		label="Convos"
	/>;
};

export default ConvoSearch;
