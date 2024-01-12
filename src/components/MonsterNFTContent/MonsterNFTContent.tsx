import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, nftAddress } from "../../pages/NFTStore/utils";

import classes from "./MonsterNFTContent.module.css";
import { Box, IconButton, Typography } from "@mui/material";
import { CustomTooltip } from "../UI";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const MonsterNFTContent = () => {
	const [monsterData, setMonsterData] = useState<any[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const convertIpfsUriToUrl = ( ipfsUri: string ) => {
		const gatewayPrefix = "https://ipfs.io/ipfs/";
		return ipfsUri.replace(/^ipfs:\/\//, gatewayPrefix);
	};

	const fetchData = async () => {
		try {
			const contract = new ethers.Contract(nftAddress, ABI, window.signer);
			const res = await contract.getAllTokenMetadata();
			console.log(res);

			const monstersMetadata = res.map(( result: any ) => ( {
				name: result[0],
				description: result[1],
				tokenId: result[2],
				image: result[3],
				attributes: {
					type: result[4][0][1],
					element: result[4][1][1],
					rarity: result[4][2][1],
					level: result[4][3][1],
					hp: result[4][4][1],
					attack: result[4][5][1],
					defense: result[4][6][1],
					specialAbility: result[4][7][1],
					generation: result[4][8][1],
					owner: result[4][9][1],
				},
			} ));

			setMonsterData(monstersMetadata);
		} catch (error) {
			console.error("Error fetching monsters data:", error);
		}
	};

	useEffect(() => {
		if ( window.signer ) {
			fetchData().then(() => console.log("Fetched data"));
		}
	}, [monsterData.length]);

	const handleNext = () => {
		setCurrentIndex(( prevIndex ) =>
			prevIndex === monsterData.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePrev = () => {
		setCurrentIndex(( prevIndex ) =>
			prevIndex === 0 ? monsterData.length - 1 : prevIndex - 1
		);
	};

	return (
		<Box>
			<Typography className={ classes.title } variant="h4">
				Your Monsters
			</Typography>
			{ monsterData.length > 0 && (
				<Box className={ classes.description }>

					<CustomTooltip
						title={ monsterData[currentIndex].description }
						placement="top"
					>
						{ monsterData[currentIndex].image && (
							<img
								className={ classes.image }
								src={ convertIpfsUriToUrl(monsterData[currentIndex].image) }
								alt={ `monster-${ currentIndex }` }
							/>
						) }
					</CustomTooltip>
					<Box className={ classes.buttons }>
						<IconButton className={ classes.button } onClick={ handlePrev }>
							<NavigateBeforeIcon/>
						</IconButton>
						<IconButton className={ classes.button } onClick={ handleNext }>
							<NavigateNextIcon/>
						</IconButton>
					</Box>

					<Box className={ classes.content }>
						<Typography>{ monsterData[currentIndex].name }</Typography>
						{ monsterData[currentIndex].attributes && (
							<ul>
								{ monsterData[currentIndex].attributes.type && (
									<li>Type: { monsterData[currentIndex].attributes.type }</li>
								) }
								{ monsterData[currentIndex].attributes.element && (
									<li>Element: { monsterData[currentIndex].attributes.element }</li>
								) }
								{ monsterData[currentIndex].attributes.rarity && (
									<li>Rarity: { monsterData[currentIndex].attributes.rarity }</li>
								) }
								{ monsterData[currentIndex].attributes.level && (
									<li>Level: { monsterData[currentIndex].attributes.level }</li>
								) }
								<li>HP: { monsterData[currentIndex].attributes.hp }</li>
								<li>Attack: { monsterData[currentIndex].attributes.attack }</li>
								<li>Defense: { monsterData[currentIndex].attributes.defense }</li>
								<li>Special Ability: { monsterData[currentIndex].attributes.specialAbility }</li>
								<li>Generation: { monsterData[currentIndex].attributes.generation }</li>
							</ul>
						) }
					</Box>
				</Box>

			) }
		</Box>
	);
};

export default MonsterNFTContent;
