import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TRootReducer} from "../types/stores";

export const useAppSelector: TypedUseSelectorHook<TRootReducer> = useSelector;