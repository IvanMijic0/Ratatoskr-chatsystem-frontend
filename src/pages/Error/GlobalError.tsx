import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./GlobalError.module.css";
import TransitionBackground from "../../components/UI/Transition/TransitionBackground.tsx";

const GlobalError = () => {
	const [seconds, setSeconds] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		const timeoutId = setInterval(() => {
			setSeconds(( prevSeconds ) => prevSeconds - 1);
		}, 1000);

		const redirectTimeoutId = setTimeout(() => {
			navigate('/guest');
		}, 5000);

		return () => {
			clearInterval(timeoutId);
			clearTimeout(redirectTimeoutId);
		};
	}, [navigate]);

	return <TransitionBackground>
		<Paper className={ classes['text-container'] }>
			<Typography className={ classes.text } variant="h4">
				Ratatoskr Error service
			</Typography>
			<Typography className={ classes.text } variant="h5">
				You are forbidden from this route.
			</Typography>
			<Typography className={ classes.text } variant="h6">
				Redirecting in { seconds } seconds...
			</Typography>
		</Paper>
	</TransitionBackground>;
};

export default GlobalError;