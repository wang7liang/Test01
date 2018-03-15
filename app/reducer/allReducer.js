/**
 * Created by wangqiliang on 2018/3/13.
 */
import { combineReducers } from 'redux'

import homeReducer from './homeReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    homeReducer,
    userReducer
});

export default rootReducer