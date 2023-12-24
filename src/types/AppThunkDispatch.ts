import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store/store.ts";
import { AnyAction } from "redux";

type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default AppThunkDispatch;