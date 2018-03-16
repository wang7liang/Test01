/**
 * Created by wangqiliang on 2018/3/13.
 */

function jcrReducer(state = {path: '/'}, action) {
    switch(action.type){
        case 'changePath':
            return {path: action.path};
        case 'receive_data':
            return {data: action.data};
        default:
            return state;
    }
}

export default jcrReducer