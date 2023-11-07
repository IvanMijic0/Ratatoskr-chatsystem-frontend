import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { JSX } from "react/jsx-runtime";

const CustomCheckbox = ( props: JSX.IntrinsicAttributes & CheckboxProps ) => {
	return (
		<Checkbox
			{ ...props }
			sx={ {
				color: "whitesmoke", // Change to your desired checkmark color
				"&.Mui-checked": {
					color: "whitesmoke", // Change to your desired checkmark color when checked
				},
			} }
		/>
	);
};

export default CustomCheckbox;
