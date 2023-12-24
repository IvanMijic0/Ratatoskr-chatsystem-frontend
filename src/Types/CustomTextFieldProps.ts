import { OutlinedInputProps, TextFieldProps } from "@mui/material";

type CustomTextFieldProps = TextFieldProps & {
	customInputProps?: OutlinedInputProps;
	error?: boolean;
};

export default CustomTextFieldProps;