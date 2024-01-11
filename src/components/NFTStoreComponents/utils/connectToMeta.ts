import { ethers } from "ethers";
import { NFTData } from "../../../types";

const connectToMeta = async (): Promise<NFTData | undefined> => {
	try {
		if ( window.ethereum ) {
			await window.ethereum.request({ method: 'eth_requestAccounts' });

			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = provider.getSigner();
			const userAddress = await ( await signer ).getAddress();

			return { provider, signer, userAddress };
		} else {
			console.error('Ethereum object not found, please install MetaMask.');
			return undefined;
		}
	} catch (error) {
		console.error('Error fetching NFTs:', error);
		return undefined;
	}
};

export default connectToMeta;
