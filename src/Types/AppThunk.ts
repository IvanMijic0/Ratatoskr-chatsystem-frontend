import { AnyAction } from "redux";
import { RootState } from "../Store";
import { ThunkAction } from "redux-thunk";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export default AppThunk;