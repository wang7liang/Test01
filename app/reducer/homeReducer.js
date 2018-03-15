/**
 * Created by wangqiliang on 2018/3/13.
 */

function homeReducer(state = {count: 0}, action) {
    const count = state.count;
    const num = action.num;
    switch(action.type){
        case 'add':
            return {count: count + num};
        case 'sub':
            return {count: count - num};
        default:
            return state;
    }
}

export default homeReducer