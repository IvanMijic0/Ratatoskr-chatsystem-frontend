import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer } from 'redux-persist';
import authReducer from './slice/auth-slice';

const persistConfig: PersistConfig<any> = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default persistedReducer;
