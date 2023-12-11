import classes from "./FriendsSearch.module.css";
import CustomAutoComplete from "../../../ui/custom_autocomplete/CustomAutoComplete.tsx";

const FriendsSearch = () => {
	const friendsData = [
		{ label: 'Jahne Doe' },
		{ label: 'Nigga Gayson' },
		{ label: 'Roadee McGee' },
		{ label: 'Satan Bosanac' },
	];

	return (
		<CustomAutoComplete
			className={ classes.search }
			disablePortal
			id="combo-box-demo"
			options={ friendsData }
			label="Friends"
		/>
	);
};

export default FriendsSearch;
