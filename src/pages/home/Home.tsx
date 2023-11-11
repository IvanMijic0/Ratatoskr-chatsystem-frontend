import { CircularProgress, Paper, Typography } from "@mui/material";
import { useLoaderData, useNavigation } from "react-router-dom";
import ILoaderData from "./ILoaderData.ts";

const Home = () => {
	const { username, email, role }: ILoaderData = useLoaderData() as ILoaderData;
	const navigation = useNavigation();

	return <Typography variant="h4">
		Data: {
		navigation.state === "loading"
			? <CircularProgress sx={ { color: "rgb(105,134,152)" } }/>
			: <Paper>
				<ul>
					<li>{ username }</li>
					<li>{ email }</li>
					<li>{ role }</li>
				</ul>
			</Paper>
	}
	</Typography>;
};

export default Home;


