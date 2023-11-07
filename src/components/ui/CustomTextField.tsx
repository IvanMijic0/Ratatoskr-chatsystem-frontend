import { OutlinedInputProps, TextField, TextFieldProps } from "@mui/material";
import React from "react";

type CustomTextFieldProps = TextFieldProps & {
	customInputProps?: OutlinedInputProps;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ( props ) => {
	const { customInputProps, ...rest } = props;

	return (
		<TextField
			{ ...rest }
			InputProps={ {
				...customInputProps,
				sx: {
					'& fieldset': {
						borderColor: 'gray',
					},
					'&:hover fieldset': {
						borderColor: 'whitesmoke!important',
						borderWidth: '2px',
					},
					'&:focus-within fieldset, &:focus-visible fieldset': {
						borderColor: 'whitesmoke!important',
						borderWidth: '3px',
					},
				},
			} }
			InputLabelProps={ {
				sx: {
					color: "lightGray!important",
					fontSize: '1.2rem'
				},
			} }
			inputProps={ {
				sx: {
					color: 'whitesmoke',
					fontSize: '1.5rem',
				},
			} }
		/>
	);
};

export default CustomTextField;


