/**
 * Created by wangqiliang on 2018/3/13.
 */
import { combineReducers } from 'redux'

import homeReducer from './homeReducer'
import jcrReducer from './jcrReducer'

const rootReducer = combineReducers({
    homeReducer,
    jcrReducer
});

export default rootReducer