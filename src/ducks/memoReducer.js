const initialState = {
    todayMemos: []
}

const GET_TODAY_MEMOS = 'GET_TODAY_MEMOS';

export function getTodayMemos(data){
    return{
        type: GET_TODAY_MEMOS,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_TODAY_MEMOS:
            return Object.assign({}, state, {todayMemos: action.payload})

        default:
            return state;
    }
}