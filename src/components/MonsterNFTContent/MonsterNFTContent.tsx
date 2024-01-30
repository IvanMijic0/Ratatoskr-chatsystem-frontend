import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { CustomTooltip } from "../UI";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import classes from "./MonsterNFTContent.module.css";

export const MonsterNFTContent = ( { monsterData }: { monsterData: any } ) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const convertIpfsUriToUrl = ( ipfsUri: string ): string => {
		const gatewayPrefix = "https://ipfs.io/ipfs/";
		const modifiedUri = ipfsUri.replace(/ipfs:\/\/?/i, '').trim(); // Remove 'ipfs://' and trim spaces

		return gatewayPrefix + modifiedUri;
	};


	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === monsterData.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePrev = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? monsterData.length - 1 : prevIndex - 1
		);
	};

	return <Box>
		{ monsterData.length > 0 && (
			<Box className={ classes.description }>

				<CustomTooltip
					title={ monsterData[currentIndex].description }
					placement="top">
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

					<Typography
						className={ classes.desc }>{ monsterData[currentIndex].description }</Typography>

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
							<li>Generation: { monsterData[currentIndex].attributes.generation }</li>
						</ul>
					) }
				</Box>
			</Box>
		) }
	</Box>;
};

export default MonsterNFTContent;
