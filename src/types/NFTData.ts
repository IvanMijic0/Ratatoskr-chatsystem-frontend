import { ethers } from "ethers";

type NFTData = {
	provider: ethers.BrowserProvider;
	signer: Promise<ethers.JsonRpcSigner>;
	userAddress: string;
}

export default NFTData;