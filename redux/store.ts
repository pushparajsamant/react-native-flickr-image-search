import {combineReducers, configureStore} from '@reduxjs/toolkit';
import SearchReducer from './reducers/SearchReducer';
import {useDispatch} from 'react-redux';
const rootReducer = combineReducers({
  search: SearchReducer,
});
const store = configureStore({
  reducer: rootReducer,
  //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
