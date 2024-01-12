import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

import { MonsterNFTContent } from "../MonsterNFTContent";
import { CustomButton, CustomCircularProgressBar, CustomTooltip } from "../UI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, nftAddress } from "../../pages/NFTStore/utils";
import classes from "./DescriptionPane.module.css";

// Put them in types later

type MonsterAttribute = {
	[key: string]: string;
}

type Monster = {
	name: string;
	description: string;
	image: string;
	attributes: MonsterAttribute;
}

export const DescriptionPane = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [monsterData, setMonsterData] = useState<any[]>([]);

	const fetchData = async () => {
		try {
			setIsLoading(true);

			const contract = new ethers.Contract(nftAddress, ABI, window.signer);
			const res: [string, string, string, [string, string][]][] = await contract.getUserNFTs(
				window.signer.getAddress()
			);

			const monstersMetadata: Monster[] = res.map(( [name, description, image, attributes] ) => ( {
				name,
				description,
				image,
				attributes: attributes.reduce(( acc, [key, value] ) => {
					acc[key.toLowerCase()] = value;
					return acc;
				}, {} as MonsterAttribute),
			} ));

			setMonsterData(monstersMetadata);
		} catch (error) {
			console.error("Error fetching monsters data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if ( window.signer ) {
			fetchData().then(() => console.log("Fetched data"));
		}
	}, [monsterData.length]);


	const storeButtonHandler = () => {
		navigate("/nft-store");
	};

	const refreshButtonHandler = async () => {
		if ( window.signer ) {
			await fetchData();
		}
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
		{ isLoading
			? <Box className={ classes.loading }>
				<CustomCircularProgressBar/>
			</Box>
			: <>
				<Box className={ classes['content-container'] }>
					<Typography className={ classes.title } variant="h4">
						Your Monsters
					</Typography>
					{
						monsterData.length === 0
							? <Typography className={ classes['no-monster'] }>No Monster Data found, maybe try
								refetching?</Typography>
							: <MonsterNFTContent monsterData={ monsterData }/>
					}
				</Box>
				<CustomTooltip title="Go to NFT store." placement="top">
					<Box className={ classes.actions }>
						<CustomButton onClick={ storeButtonHandler }>Store</CustomButton>
					</Box>
				</CustomTooltip>

				<CustomTooltip title="Refetch Monster Data.">
					<Box className={ classes.actions }>
						<CustomButton onClick={ refreshButtonHandler }>
							<RefreshIcon/>
						</CustomButton>
					</Box>
				</CustomTooltip>
			</>
		}
	</Box>;
};

export default DescriptionPane;