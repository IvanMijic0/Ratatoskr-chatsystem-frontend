import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import persistedReducer from "./persistConfig.ts"; // Import redux-thunk
import serverReducer from "./slice/server_slice/server-slice.ts";
import channelClustersReducer from "./slice/channelClusters_slice/channelClusters-slice.ts";

const store = configureStore({
	reducer: {
		auth: persistedReducer,
		server: serverReducer,
		channelClusters: channelClustersReducer,
	},
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

// export { store };

export { store, persistor };