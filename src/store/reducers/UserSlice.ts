import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./ActionCreators";

interface UserState {
 users: IUser[];
 isLoading: boolean;
 error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
}
    // Важно: reducers - объект содержащий генераторы событий(action creators).
    // usage: dispatch(userSlice.action.usersFetchingSuccess(data))
    // По сути посредством слайсов убирается прослойка action creator - оптимизация.
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /* 1 способ (см. ActionCreators.ts) */
        // usersFetching(state) {
        //     state.isLoading = true
        // },
        // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false
        //     state.users = action.payload
        // },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
        //     state.error = action.payload
        // },
    },

    /* 2 способ (см. ActionCreators.ts)
     Кажется не совсем корректным опираться на статус выполнения запроса,
     хотя наверняка это удобнее для работы с промисами/запросами. */

    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
    state.isLoading = false
    state.users = action.payload
},
        [fetchUsers.pending.type]: (state) => {
    state.isLoading = true
},
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
    state.isLoading = false;
    state.error = action.payload
},
    }
})

export default userSlice.reducer;
