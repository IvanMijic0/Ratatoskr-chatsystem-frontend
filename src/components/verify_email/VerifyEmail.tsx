import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axiosInstance from "../../configuration/axios-instance.ts";
import { Box, Paper, Typography } from '@mui/material';
import classes from './VerifyEmail.module.css';

function VerifyEmail() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get('code') || '';

	const [verificationStatus, setVerificationStatus] = useState('');

	useEffect(() => {
		const verifyEmail = async () => {
			const response = await axiosInstance.get(`verifyEmailToken?code=${ code }`);

			console.log(response.data);

			if ( response.data === 'Successful verification!' ) {
				setVerificationStatus('Email verified successfully!');
				setTimeout(() => navigate("/guest"), 5000);
			} else {
				setVerificationStatus('Confirmation token expired!');
			}
		};

		Promise.resolve(verifyEmail())
			.catch(error => {
				console.error('Error verifying email:', error);
				setVerificationStatus('Error verifying email.');
			});
	}, [code, navigate]);

	return <Box className={ classes.background }>
		<Paper className={ classes['text-container'] }>
			<Typography className={ classes.text } variant="h4">Ratatoskr mailing service:</Typography>
			<Typography className={ classes.text } variant="h5">{ verificationStatus }</Typography>
		</Paper>
	</Box>;
}

export default VerifyEmail;
