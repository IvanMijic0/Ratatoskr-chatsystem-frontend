import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import axios from "axios";

import { CustomButton, TransitionBackground } from "../UI";
import classes from './VerifyEmail.module.css';

function VerifyEmail() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get('code') || '';

	const [verificationStatus, setVerificationStatus] = useState('Email verified successfully!');
	const [isRedirect, setIsRedirect] = useState(false);

	useEffect(() => {
		const verifyEmail = async () => {
			const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/auth/verifyEmailToken?code=${code}`);

			if (response.data === 'Successful verification!') {
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
		<Paper className={classes['text-container']}>
			<Typography className={classes.text} variant="h4">Ratatoskr mailing service</Typography>
			<Typography className={classes.text} variant="h5">{verificationStatus}</Typography>
			{isRedirect &&
				<CustomButton className={classes.button} onClick={loginButtonHandler}>Login</CustomButton>}
		</Paper>
	</TransitionBackground>;
}

export default VerifyEmail;