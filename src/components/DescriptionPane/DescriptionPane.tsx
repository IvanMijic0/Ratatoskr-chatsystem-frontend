import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

import classes from "./DescriptionPane.module.css";
import { MonsterNFTContent } from "../MonsterNFTContent";
import { CustomButton, CustomTooltip } from "../UI";
import { useNavigate } from "react-router-dom";

export const DescriptionPane = () => {
	const navigate = useNavigate();

	const storeButtonHandler = () => {
		navigate("/nft-store");
	};

	const sellButtonHandler = () => {
		console.log("Sell button clicked.");
	};

	return <Box className={ classes.backgrounds }>
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box className={ classes.header }>
						<Button>
							<Typography sx={ { textTransform: "none" } }>MonsterNFT</Typography>
						</Button>
						<Button>
							<Typography sx={ { textTransform: "none" } }>Details</Typography>
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
		<Box className={ classes['content-container'] }>
			<MonsterNFTContent/>
		</Box>
		<CustomTooltip title="Go to NFT store." placement="top">
			<Box className={ classes.actions }>
				<CustomButton onClick={ storeButtonHandler }>Store</CustomButton>
			</Box>
		</CustomTooltip>
		<CustomTooltip title="Sell Monster.">
			<Box className={ classes.actions }>
				<CustomButton onClick={ sellButtonHandler }>Sell</CustomButton>
			</Box>
		</CustomTooltip>
	</Box>;
};

export default DescriptionPane;