import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from "./root-reducer"; 
import { persistStore } from 'redux-persist';
import rootSaga from './root-saga';


const sagaMiddlewares = createSagaMiddleware();


export const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddlewares),
  devTools: process.env.NODE_ENV !== 'production'
  });

export const persistor = persistStore(store);



sagaMiddlewares.run(rootSaga);
export default ( store , persistor);