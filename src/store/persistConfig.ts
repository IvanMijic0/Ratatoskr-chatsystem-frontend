import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer } from 'redux-persist';
import authReducer from './slice/auth-slice';
import { combineReducers } from "redux";

const persistConfig: PersistConfig<any> = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth'], // Specify the slices you want to persist
};

const reducer = combineReducers({
	auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;
