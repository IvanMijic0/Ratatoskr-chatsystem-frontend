import { useEffect, useState } from 'react';
import {Box, Button, Grid, Modal} from "@mui/material";
import classes from './NFTStore.module.css';
import NFTShopCard from "./NFTShopCard.tsx";
import AddNewNft from "./AddNewNft.tsx";
import {ABI, monsterTokenABI, monsterTokenAddress, nftAddress} from './utils';
import { ethers } from 'ethers';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};


function NFTShop() {
	console.log('#########')
	const [NFTs, setNFTs] = useState<NFTData[]>([]);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(null);
	const [userAddress, setUserAddress] = useState<string>('');

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => setIsModalOpen(false);

	useEffect(() => {
		const initEthereum = async () => {
			try {
				if (window.ethereum) {
					const provider = new ethers.BrowserProvider(window.ethereum);
					await provider.send('eth_requestAccounts', []);
					const signer = provider.getSigner();
					const userAddress = await (await signer).getAddress();
					console.log(ABI);
					const contract = new ethers.Contract(nftAddress.nftAddress, ABI, await signer);
					const tokenContract = new ethers.Contract(monsterTokenAddress.monsterTokenAddress, monsterTokenABI, await signer);

					setUserAddress(userAddress);
					setContract(contract);
					setTokenContract(tokenContract);
				} else {
					throw new Error('Ethereum object not found, please install MetaMask.');
				}
			} catch (error) {
				console.error('Error initializing Ethereum:', error);
			}
		};

		initEthereum();
	}, []);

	useEffect(() => {
		const fetchNFTs = async () => {
			try {
				if (contract) {
					const rawNFTData = await contract.getAllTokenMetadata();
					console.log('Raw NFT Data:', rawNFTData);

					const hasNonEmptyValues = (nft) => {
						if (nft.name || nft.description || nft.image) {
							return true;
						}

						if (Array.isArray(nft.attributes) && nft.attributes.length > 0) {
							return true;
						}
						return false;
					};
					const formattedNFTData = rawNFTData
						.filter(nft => hasNonEmptyValues(nft))
						.map((nft: { name: any; description: any; price: any; image: any; type: any; element: any; rarity: any; level: any; hp: any; attack: any; defense: any; specialAbility: any; generation: any; owner: any; }) => {
						const attributesArray = nft[3];
						return {
							// id: typeof nft[0] === 'string' && nft[0].endsWith('n') ? Number(nft[0]) : Number(nft[0]),
							name: nft.name,
							description: nft.description,
							image: nft.image,
							attributes: attributesArray.map(attr => ({
								trait_type: attr[0],
								value: attr[1]
							})),
							// price: typeof nft[3] === 'string' && nft[3].endsWith('n') ? Number(nft[3]) : Number(nft[3]),
						};
					});
					console.log('Formatted NFT Data:', formattedNFTData)
					setNFTs(formattedNFTData);
				} else {
					throw new Error('Contract or userAddress not available.');
				}
			} catch (error) {
				console.error('Error fetching NFTs:', error);
			}
		};

		fetchNFTs();
	}, [contract, userAddress]);

	return (
		<Box className={classes.background} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<Grid container spacing={3} sx={{ textAlign: 'center' }}>
				<Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						component="label"
						variant="contained"
						onClick={async () => {

							// TODO delete this in future

							if (contract) {
								await contract.awardInitialTokens(userAddress);
								const balance = await tokenContract.balanceOf(userAddress);
								console.log(`User balance: ${balance.toString()}`);
							} else {
								console.log('Contract null');
							}
						}}
						startIcon={<CloudUploadIcon />}
					>
						Get Free Coins
					</Button>
					<Button component="label" variant="contained" onClick={handleModalOpen} startIcon={<CloudUploadIcon />}>Add New NFT</Button>

					<Modal
						open={isModalOpen}
						onClose={handleModalClose}
						aria-labelledby="add-new-nft-modal"
						aria-describedby="add-new-nft-form"
					>
						<AddNewNft contract={contract} account={userAddress} handleClose={handleModalClose} open/>
					</Modal>
				</Grid>
				<Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
					{NFTs.map((nft, index) => (
						<Grid item xs={12} sm={6} md={4} key={index} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
							<NFTShopCard nft={nft} contract={contract} tokenContract={tokenContract} account={userAddress}/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Box>
	);
}

export default NFTShop;
