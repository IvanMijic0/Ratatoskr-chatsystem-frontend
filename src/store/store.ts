import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import notificationReducer from "./slice/notification-slice.ts";
import { persistedAuthReducer, persistedUserReducer } from "./persistConfig.ts";

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		user: persistedUserReducer,
		notification: notificationReducer,
	},
	middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };