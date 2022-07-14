import { configureStore, combineReducers } from '@reduxjs/toolkit';

import main from './main/reducer';

const rootReducer = combineReducers({
    main
});

export default configureStore({ reducer: rootReducer })