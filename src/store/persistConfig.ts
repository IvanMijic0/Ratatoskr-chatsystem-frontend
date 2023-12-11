import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer } from 'redux-persist';
import authReducer from './slice/auth_slice/auth-slice.ts';
import serverReducer from "./slice/server_slice/server-slice.ts";
import userReducer from "./slice/user-slice/user-slice.ts";

const authPersistConfig: PersistConfig<any> = {
	key: 'auth',
	version: 1,
	storage,
};

const serverPersistConfig: PersistConfig<any> = {
	key: 'server',
	version: 1,
	storage,
};

const userPersistConfig: PersistConfig<any> = {
	key: 'user',
	version: 1,
	storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedServerReducer = persistReducer(serverPersistConfig, serverReducer);

export { persistedAuthReducer, persistedUserReducer, persistedServerReducer };
