import { Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchGoogleUserInfo } from "../../../../configuration/axios-instance.ts";
import CustomButton from "../../../ui/CustomButton.tsx";
import { useAppDispatch } from "../../../../hooks/redux-hooks.ts";
import classes from "./GoogleLoginButton.module.css";
import { setAuthData, validateTokenAsync } from "../../../../store/action/auth-action.ts";
import FormDialog from "../form_dialog/FormDialog.tsx";
import useInput from "../../../../hooks/useInput.tsx";
import { passwordValidation } from "../shared/validationRegex.ts";
import IGoogleUserData from "./IGoogleUserData.ts";
import axios from 'axios';


const GoogleLoginButton = () => {
	const [userToken, setUserToken] = useState<TokenResponse | null>(null);
	const [user, setUser] = useState<IGoogleUserData | null>(null);
	const [openDialogForm, setOpenDialogForm] = useState(false);

	const registerPasswordValidation = useInput(passwordValidation);
	const registerConfirmPasswordValidation = useInput(
		value => value.match(registerPasswordValidation.value)
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	let registerFormIsValid: boolean = false;

	if ( registerPasswordValidation.isValid &&
		registerConfirmPasswordValidation.isValid ) {
		registerFormIsValid = true;
	}

	const googleLogin = useGoogleLogin({
		onSuccess: ( response ) => setUserToken(response),
		onError: ( error ) => console.log('Login failed: ' + error),
	});


	useEffect(() => {
		const fetchUser = async () => {
			try {
				googleLogin();
				const accessToken = userToken?.access_token;

				if ( accessToken === null ) {
					return;
				}
				const { data: googleUserData } = await fetchGoogleUserInfo(accessToken);

				setUser(googleUserData);

				const userExistsResponse = await axios.post('http://localhost:8080/api/v1/user/checkIfExists', {
					email: googleUserData.email
				});

				// I could probably add a better check
				if ( userExistsResponse.status === 200 ) {
					dispatch(setAuthData(
						undefined,
						{
							email: googleUserData.email,
							firstName: googleUserData.given_name,
							lastName: googleUserData.family_name,
							googleId: googleUserData.id,
							avatarImageUrl: googleUserData.picture,
						}
					));
					dispatch(validateTokenAsync());
				}

				console.log('Google user info:', googleUserData);
			} catch (error) {
				setOpenDialogForm(true);
				console.error('Google login failed:', error);
			}
		};
		if ( userToken && user === null ) {
			fetchUser().then();
		}

	}, [dispatch, googleLogin, navigate, user, userToken, userToken?.access_token]);


	return <>
		<Box>
			<CustomButton
				onClick={ () => googleLogin() }
				showTooltip
				tooltipTitle="Login with your google account."
				tooltipPlacement="bottom"
			>
				<GoogleIcon className={ classes['google-button-icon'] }/>
			</CustomButton>
		</Box>
		<FormDialog
			open={ openDialogForm }
			setOpen={ setOpenDialogForm }
			userData={ user }
			passwordChangeHandler={ registerPasswordValidation.valueChangeHandler }
			passwordBlurHandler={ registerPasswordValidation.inputBlurHandler }
			enteredPassword={ registerPasswordValidation.value }
			passwordHasError={ registerPasswordValidation.hasError }
			confirmPasswordChangeHandler={ registerConfirmPasswordValidation.valueChangeHandler }
			confirmPasswordBlurHandler={ registerConfirmPasswordValidation.inputBlurHandler }
			enteredConfirmPassword={ registerConfirmPasswordValidation.value }
			confirmPasswordHasError={ registerConfirmPasswordValidation.hasError }
			formIsValid={ registerFormIsValid }
		/>
	</>;
};

export default GoogleLoginButton;
