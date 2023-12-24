import { ButtonProps } from "@mui/material";

type CustomCircularButtonProps = ButtonProps & {
	showTooltip?: boolean;
	tooltipTitle?: string;
	tooltipPlacement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
}

export default CustomCircularButtonProps;