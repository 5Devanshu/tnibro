import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloader: false,
    isResendEmailSuccess: '',
    isResendEmailError: ''

}

const resendEmailSlice = createSlice({
    name: 'resendEmail',
    initialState,
    reducers: {
        getResendEmail(state, action) {
            state.isloader = true
            state.isResendEmailError = ''
            state.isResendEmailSuccess = ''
        },
        getResendEmailSuccess(state, action) {
            state.isloader = false
            state.isResendEmailError = ''
            state.isResendEmailSuccess = action?.payload
        },
        getResendEmailFailure(state, action) {
            state.isloader = false
            state.isResendEmailError = action?.payload
            state.isResendEmailSuccess = ''
        },
    }
});

export const {
    getResendEmail,
    getResendEmailSuccess,
    getResendEmailFailure,

} = resendEmailSlice.actions;

export default resendEmailSlice.reducer;
