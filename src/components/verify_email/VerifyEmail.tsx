import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';
import classes from './VerifyEmail.module.css';
import CustomButton from "../ui/CustomButton.tsx";
import TransitionBackground from "../ui/transition/TransitionBackground.tsx";
import axios from "axios";

function VerifyEmail() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get('code') || '';

	const [verificationStatus, setVerificationStatus] = useState('Email verified successfully!');
	const [isRedirect, setIsRedirect] = useState(false);

	useEffect(() => {
		const verifyEmail = async () => {
			const response = await axios.get(`/auth/verifyEmailToken?code=${ code }`);

			if ( response.data === 'Successful verification!' ) {
				setVerificationStatus('Email verified successfully!');
				setTimeout(() => {
					setVerificationStatus("Redirecting to login?");
					setIsRedirect(true);
				}, 3000);

			} else {
				setVerificationStatus('Confirmation token expired!');
			}
		};

		Promise.resolve(verifyEmail())
			.catch(error => {
				console.error('Error verifying email:', error);
				setVerificationStatus('Error verifying email.');
			});
	}, [code]);

	const loginButtonHandler = () => {
		navigate("/guest");
	};

	return <TransitionBackground>
		<Paper className={ classes['text-container'] }>
			<Typography className={ classes.text } variant="h4">Ratatoskr mailing service</Typography>
			<Typography className={ classes.text } variant="h5">{ verificationStatus }</Typography>
			{ isRedirect &&
              <CustomButton className={ classes.button } onClick={ loginButtonHandler }>Login</CustomButton> }
		</Paper>
	</TransitionBackground>;
}

export default VerifyEmail;