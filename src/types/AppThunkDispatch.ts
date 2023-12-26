import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import RootState from "./RootState.ts";

type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default AppThunkDispatch;