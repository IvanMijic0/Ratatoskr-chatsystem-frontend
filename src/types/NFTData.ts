import { ethers } from "ethers";

type NFTData = {
	provider: ethers.BrowserProvider;
	userAddress: string;
}

export default NFTData;