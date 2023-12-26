import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import RootState from "./RootState.ts";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export default AppThunk;