import { combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { api } from './api';
import { reduxStorage } from '_app/core/mmkv';
import eventsSlice from '_app/features/Events/eventsSlice';

const persistConfig = {
  version: 1,
  key: 'root',
  storage: reduxStorage,
  timeout: undefined,
  whitelist: [],
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const RootReducer = combineReducers({
  events: eventsSlice,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducer);

const middlewares: Middleware[] = [api.middleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: {
    trace: true,
    traceLimit: 25,
  },
});

export const persistor = persistStore(store);
