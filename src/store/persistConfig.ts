import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer } from 'redux-persist';
import authReducer from './slice/auth_slice/auth-slice.ts';

const persistConfig: PersistConfig<any> = {
	key: 'root',
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default persistedReducer;
