import { Fragment, useEffect } from "react";
import { connectToMeta } from "../NFTStoreComponents/utils";
import { UserService } from "../../services";
import { useSnackbar } from "../../hooks";

export const CheckMetaMask = () => {
	const { showSnackbar } = useSnackbar();

	const checkMetaMask = async () => {
		try {
			const result = await connectToMeta();

			if ( result ) {
				const { userAddress } = result;
				console.log("User MetaMask address: " + userAddress);

				const exists = await UserService.checkIfMetaMaskAddressExists(userAddress);
				console.log("MetaMask exists: " + exists);

				if ( !exists ) {
					await UserService.setMetaMaskAddress(userAddress);
					showSnackbar('Successfully synced MetaMask', 'success');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		checkMetaMask().then();
	}, []);

	return <Fragment/>;
};

export default CheckMetaMask;