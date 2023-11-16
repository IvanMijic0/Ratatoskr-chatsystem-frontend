import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import persistedReducer from "./persistConfig.ts"; // Import redux-thunk

const store = configureStore({
	reducer: {
		auth: persistedReducer,
	},
	middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

// export { store };

export { store, persistor };