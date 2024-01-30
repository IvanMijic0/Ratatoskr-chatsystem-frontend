import React from "react";
import { Button } from "@mui/material";
import CustomTooltip from "./CustomTooltip.tsx";
import CustomButtonProps from "../../types/CustomButtonProps.ts";

const CustomButton: React.FC<CustomButtonProps>
	= ( {
			children,
			showTooltip = false,
			tooltipTitle = "Default Tooltip Title",
			tooltipPlacement = 'top',
			...otherProps
		} ) => {
	const buttonComponent = <Button
		{ ...otherProps }
		sx={ {
			width: "6rem",
			height: "3rem",
			backgroundColor: "#557385",
			color: "white",
			"&:hover": {
				backgroundColor: "#4a6473",
			},
			"&:active": {
				backgroundColor: "#202d35",
			},
			fontSize: "1rem",
			borderRadius: "10px"
		} }
	>
		{ children }
	</Button>;

	if ( showTooltip ) {
		return <CustomTooltip title={ tooltipTitle } arrow placement={ tooltipPlacement }>
			{ buttonComponent }
		</CustomTooltip>;
	}
	return buttonComponent;
};

export default CustomButton;