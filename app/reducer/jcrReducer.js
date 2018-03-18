/**
 * Created by wangqiliang on 2018/3/13.
 */

function jcrReducer(state = {data:[],retData:{}}, action) {
    switch(action.type){
        case 'loadedData':
            return Object.assign({}, state, {data:action.data });
        case 'clearData':
            return Object.assign({}, state, {data:action.data });
        case 'changeSelect':
            return Object.assign({}, state, {retData:action.retData });
        default:
            return state;
    }
}

export default jcrReducer