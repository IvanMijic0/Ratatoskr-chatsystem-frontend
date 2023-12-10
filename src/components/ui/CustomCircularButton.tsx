import React from "react";
import { Button, ButtonProps } from "@mui/material";
import CustomTooltip from "./CustomTooltip.tsx";

interface CustomCircularButtonProps extends ButtonProps {
	showTooltip?: boolean;
	tooltipTitle?: string;
	tooltipPlacement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
}

const CustomCircularButton: React.FC<CustomCircularButtonProps> = ( {
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
				backgroundColor: "#557385",
				color: "white",
				width: "3rem",
				height: "3rem",
				borderRadius: "100%",
				"&:hover": {
					backgroundColor: "#4a6473",
				},
				"&:active": {
					backgroundColor: "#202d35",
				},
				fontSize: "1rem",
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

export default CustomCircularButton;

