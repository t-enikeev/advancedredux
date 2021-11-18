import {AppDispatch} from "../store";
import axios from "axios";
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";

/* 1 способ (см. UserSlice.ts) */

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         // @ts-ignore
//         dispatch(userSlice.actions.usersFetchingError(e.message))
//
//     }
// }

/* 2 способ (см. UserSlice.ts) */
export const fetchUsers = createAsyncThunk('user/fetchAll',
    async (_, thunkAPI) => {
        try {
                const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
                return response.data;
        }
            catch(e) {
                // @ts-ignore
                return thunkAPI.rejectWithValue(e.message)

            }

}
)
