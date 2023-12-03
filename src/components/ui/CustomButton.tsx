import React from "react";
import { Button, ButtonProps } from "@mui/material";
import CustomTooltip from "./CustomTooltip.tsx";

interface CustomButtonProps extends ButtonProps {
	showTooltip?: boolean;
	tooltipTitle?: string;
	tooltipPlacement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
}

const CustomButton: React.FC<CustomButtonProps> = ( {
														children,
														showTooltip = false,
														tooltipTitle = "Default Tooltip Title",
														tooltipPlacement = 'top',
														...otherProps
													} ) => {
	const buttonComponent = (
		<Button
			{ ...otherProps }
			sx={ {
				width: "6rem",
				height: "2.5rem",
				backgroundColor: "#557385",
				color: "white",
				"&:hover": {
					backgroundColor: "#4a6473",
				},
				"&:active": {
					backgroundColor: "#202d35",
				},
				fontSize: "1.1rem",
				borderRadius: "10px"
			} }
		>
			{ children }
		</Button>
	);

	if ( showTooltip ) {
		return (
			<CustomTooltip title={ tooltipTitle } arrow placement={ tooltipPlacement }>
				{ buttonComponent }
			</CustomTooltip>
		);
	}

	return buttonComponent;
};

export default CustomButton;

