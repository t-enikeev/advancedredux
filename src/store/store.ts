import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import {postAPI} from "../services/PostService";

const rootReducer = combineReducers({
    userReducer,
    [postAPI.reducerPath]: postAPI.reducer
})

export const setupStore = () => {
    return configureStore(
        {
            reducer: rootReducer,
            middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(postAPI.middleware))
        }
    )
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof rootReducer>
// @ts-ignore
export type AppDispatch = AppStore['dispatch'];


