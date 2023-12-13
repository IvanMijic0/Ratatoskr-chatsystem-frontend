import classes from "./ConvoSearch.module.css";
import CustomAutoComplete from "../../../ui/custom_autocomplete/CustomAutoComplete.tsx";

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
