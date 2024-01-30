import { Box } from "@mui/material";

import { CustomButton, CustomTooltip } from "../../../UI";
import metamask from "../../../../assets/metamask.svg";
import classes from './MetaButton.module.css';
import { connectToMeta } from "../../../NFTStoreComponents/utils";
import { AuthService, UserService } from "../../../../services";
import { useAppDispatch, useSnackbar } from "../../../../hooks";

export const MetaButton = () => {
	const dispatch = useAppDispatch();
	const { showSnackbar } = useSnackbar();

	const metaLoginHandler = async () => {
		try {
			const result = await connectToMeta();

			if ( result ) {
				const { userAddress } = result;
				console.log("User MetaMask address: " + userAddress);

				const exists = await UserService.checkIfMetaMaskAddressExists(userAddress);
				console.log("MetaMask exists: " + exists);

				if ( exists ) {
					await AuthService.metaMaskLogin(userAddress, dispatch);
				} else {
					showSnackbar('MetaMask address not registered. Please register and setup your metamask address.', 'error');
				}
			} else {
				console.error('Connection to MetaMask failed or user address not available.');
			}
		} catch (error) {
			console.error(error);
		}
	};


	return <Box className={ classes.button }>
		<CustomTooltip title="Login with Metamask.">
			<Box>
				<CustomButton onClick={ metaLoginHandler }>
					<img className={ classes.image } src={ metamask } alt="Metamask button."/>
				</CustomButton>
			</Box>
		</CustomTooltip>
	</Box>;
};

export default MetaButton;