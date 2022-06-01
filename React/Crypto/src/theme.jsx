import { createSlice } from "@reduxjs/toolkit"

export const theme = createSlice({
    name: "theme",
    initialState: {
        value: false,
    },
    reducers: {
        toggleTheme: state => {
            state.value = !state.value
        },
    },
})

export const { toggleTheme } = theme.actions
export default theme.reducer