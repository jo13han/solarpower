import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store, type RootState } from "./store";

// typed redux hooks
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
