import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import channelClustersReducer from "./slice/channelClusters_slice/channelClusters-slice.ts";
import channelReducer from "./slice/channel_slice/channel-slice.ts";
import { persistedAuthReducer, persistedServerReducer, persistedUserReducer } from "./persistConfig.ts";

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		user: persistedUserReducer,
		server: persistedServerReducer,
		channelClusters: channelClustersReducer,
		channel: channelReducer
	},
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };