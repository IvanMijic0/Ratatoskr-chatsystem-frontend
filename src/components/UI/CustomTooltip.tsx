import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const CustomTooltip = styled(( { className, ...props }: TooltipProps ) => (
	<Tooltip { ...props } arrow classes={ { popper: className } }>
		{ props.children }
	</Tooltip>
))(() => ( {
	[`& .${ tooltipClasses.arrow }`]: {
		color: '#232124',
	},
	[`& .${ tooltipClasses.tooltip }`]: {
		backgroundColor: '#232124',
	},
} ));

export default CustomTooltip;
