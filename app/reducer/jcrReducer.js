/**
 * Created by wangqiliang on 2018/3/13.
 */

function jcrReducer(state = {life:'Init', scheme:[], data:[], path:'/'}, action) {
    switch(action.type){
        case 'loadedScheme':
            return Object.assign({}, state, { life:'LoadedScheme',scheme:action.scheme });
        case 'loadedData':
            return Object.assign({}, state, { life:'LoadedData',data:action.data });
        case 'clickPath':
            return Object.assign({}, state, { life:'LoadedScheme',path: action.path });
        default:
            return state;
    }
}

export default jcrReducer