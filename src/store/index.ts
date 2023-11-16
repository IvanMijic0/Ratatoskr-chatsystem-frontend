import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/auth-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: false
		});
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

// TODO figure out why persistance did not work

export { store };

// export { store, persistor };