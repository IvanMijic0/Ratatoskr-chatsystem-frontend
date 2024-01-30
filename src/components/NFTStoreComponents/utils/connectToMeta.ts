import { ethers } from "ethers";
import { NFTData } from "../../../types";

const connectToMeta = async (): Promise<NFTData | undefined> => {
	try {
		if ( window.ethereum ) {
			await window.ethereum.request({ method: 'eth_requestAccounts' });

			const provider = new ethers.BrowserProvider(window.ethereum);
			window.signer = await provider.getSigner();
			const userAddress = await ( await window.signer ).getAddress();

			return { provider, userAddress };
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
