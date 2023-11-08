import { Button, ButtonProps } from "@mui/material";
import React from "react";

type CustomButtonProps = ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ( props ) => {
	return (
		<Button
			{ ...props }
			sx={ {
				width: "10rem",
				height: "3rem",
				backgroundColor: "#557385",
				color: "white",
				"&:hover": {
					backgroundColor: "#4a6473",
				},
				"&:active": {
					backgroundColor: "#202d35",
				},
				fontSize: "1.1rem"
			} }
		>
			{ props.children }
		</Button>
	);
};

export default CustomButton;
