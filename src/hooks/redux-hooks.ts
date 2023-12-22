import { RootState } from "../Store/store.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../Types";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;