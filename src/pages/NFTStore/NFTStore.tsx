import { useEffect, useState } from 'react';
import { Box, Grid } from "@mui/material";
import classes from './NFTStore.module.css';
import NFTStoreCard from "./NFTStoreCard.tsx";
import sampleNFTs from "./sampleNFTs.ts";

// import Web3 from 'web3';
// import NFTContractABI from './NFTContractABI.json';
// const web3 = new Web3('');
// const nftContract = new web3.eth.Contract(NFTContractABI, '');


function NFTStore() {
	const [NFT, setNFT] = useState<NonNullable<unknown>[]>([]);

	useEffect(() => {
		setNFT(sampleNFTs);
	}, []);

	return (
		<Box className={classes.background} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<Grid container spacing={3} sx={{ textAlign: 'center' }}>
				{NFT.map((nft, index) => (
					<Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
						<NFTStoreCard nft={nft} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default NFTStore;
