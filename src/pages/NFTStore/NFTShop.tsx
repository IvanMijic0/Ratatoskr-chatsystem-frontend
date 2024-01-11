import { useEffect, useState } from 'react';
import { Box, Grid } from "@mui/material";
import classes from './NFTStore.module.css';
import NFTShopCard from "./NFTShopCard.tsx";
import { ABI, nftAddress } from './utils';
import { ethers } from 'ethers';
import AddNewNft from "./AddNewNft.tsx";

interface NFTAttribute {
	trait_type: string;
	value: string;
}

interface NFTData {
	name: string;
	description: string;
	image: string;
	attributes: NFTAttribute[];
}


function NFTShop() {
	const [NFT, setNFTs] = useState<NFTData[]>([]);

	useEffect(() => {
		const fetchNFTs = async () => {
			try {
				if ( window.ethereum ) {
					await window.ethereum.request({ method: 'eth_requestAccounts' });

					const provider = new ethers.BrowserProvider(window.ethereum);

					// const addresses = await window.provider.send("eth_requestAccounts", []);

					const signer = provider.getSigner();

					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const contract = new ethers.Contract(nftAddress, ABI, signer);

					const userAddress = await ( await signer ).getAddress();
					const nftTokenIds = await contract.getUserNFTs(userAddress);

					const nftData = await Promise.all(nftTokenIds.map(async ( tokenId: any | ethers.Overrides ) => {
						return await contract.getNftData(tokenId);
					}));

					setNFTs(nftData);
				} else {
					console.error('Ethereum object not found, please install MetaMask.');
				}
			} catch (error) {
				console.error('Error fetching NFTs:', error);
			}
		};

		fetchNFTs();
	}, []);

	return (
		<Box className={ classes.background }
			 sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' } }>
			<Grid container spacing={ 3 } sx={ { textAlign: 'center' } }>
				<Grid container={ true } item={ true } xs={ 12 } sx={ { display: 'flex', justifyContent: 'center' } }>
					<AddNewNft/>
				</Grid>
				<Grid container={ true } item={ true } xs={ 12 } sx={ { display: 'flex', justifyContent: 'center' } }>
					{ NFT.map(( nft, index ) => (
						<Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }
							  sx={ { display: 'flex', justifyContent: 'center' } }>
							<NFTShopCard nft={ nft }/>
						</Grid>
					)) }
				</Grid>
			</Grid>
		</Box>
	);
}

export default NFTShop;
