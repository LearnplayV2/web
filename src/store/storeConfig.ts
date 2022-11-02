import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";

const store = configureStore({
    reducer: alert
});

export default store;