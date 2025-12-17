import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "./slicer/settingslicer";

const store = configureStore({
    reducer: {
        settings: settingsReducer,
    },
});

export default store;
    