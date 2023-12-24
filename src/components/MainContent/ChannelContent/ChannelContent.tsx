import { Typography } from "@mui/material";

export const ChannelContent = ( props: { id: string } ) => {
	return <>
		<Typography>Welcome to the channel with id: { props.id }</Typography>
	</>;
};

export default ChannelContent;