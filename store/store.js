import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import jobSlice from "../features/job/jobSlice";
import filterSlice from "../features/filter/filterSlice";
import toggleSlice from "../features/toggle/toggleSlice";

export const store = configureStore({
    reducer: {
        job: jobSlice,
        filter: filterSlice,
        auth: authSlice,
        toggle: toggleSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
