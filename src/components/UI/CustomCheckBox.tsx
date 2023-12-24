import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { JSX } from "react/jsx-runtime";

const CustomCheckbox = ( props: JSX.IntrinsicAttributes & CheckboxProps ) => {
	return <Checkbox
		{ ...props }
		sx={ {
			color: "whitesmoke",
			"&.Mui-checked": {
				color: "whitesmoke",
			},
		} }
	/>;
};

export default CustomCheckbox;
