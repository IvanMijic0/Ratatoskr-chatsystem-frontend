import { TextField } from "@mui/material";
import { CustomTextFieldProps, HelperTextStyles } from "../../types";
import { FC } from "react";

const CustomTextField: FC<CustomTextFieldProps> = ( props ) => {
	const { customInputProps, error, ...rest } = props;

	const inputSx = {
		'& fieldset': {
			borderColor: error ? 'pink' : 'gray',
		},
		'&:hover fieldset': {
			borderColor: error ? 'pink!important' : 'whitesmoke!important',
			borderWidth: error ? '2px' : '2px',
		},
		'&:focus-within fieldset, &:focus-visible fieldset': {
			borderColor: error ? 'pink!important' : 'whitesmoke!important',
			borderWidth: error ? '3px' : '3px',
		},
	};

	const labelSx = {
		color: error ? 'pink!important' : 'lightGray!important',
		fontSize: '1.2rem',
	};

	const inputPropsSx = {
		color: error ? 'pink' : 'whitesmoke',
		fontSize: '1.5rem',
	};

	const helperTextSx: HelperTextStyles = {
		color: error ? 'pink' : undefined,
		fontSize: '1rem',
		whiteSpace: 'normal',
	};

	return <TextField
		{ ...rest }
		InputProps={ {
			...customInputProps,
			sx: inputSx,
		} }
		InputLabelProps={ {
			sx: labelSx,
		} }
		inputProps={ {
			sx: inputPropsSx,
		} }
		helperText={
			error
				? <span style={ helperTextSx }>{ props.helperText }</span>
				: <span style={ helperTextSx }>{ props.helperText }</span>
		}
	/>;
};

export default CustomTextField;