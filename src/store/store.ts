import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import channelClustersReducer from "./slice/channelClusters-slice.ts";
import channelReducer from "./slice/channel-slice.ts";
import friendReducer from "./slice/friend-slice.ts";
import notificationReducer from "./slice/notification-slice.ts";
import { persistedAuthReducer, persistedServerReducer, persistedUserReducer } from "./persistConfig.ts";

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		user: persistedUserReducer,
		friend: friendReducer,
		server: persistedServerReducer,
		channelClusters: channelClustersReducer,
		channel: channelReducer,
		notification: notificationReducer,
	},
	middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };