import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";


export const useTypedDispatch = () => useDispatch<AppDispatch>()


// Добавляет типизацию поверх стандартного useSelector
export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector;

