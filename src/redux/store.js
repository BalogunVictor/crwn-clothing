import { configureStore} from '@reduxjs/toolkit'
import rootReducer from "./root-reducer"; 
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = configureStore ({ reducer:rootReducer, middleware:[thunk]} );

export const persistor = persistStore(store);

export default ( store , persistor ) ;