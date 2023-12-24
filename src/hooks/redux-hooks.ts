import { RootState } from "../store/store.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../types";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;