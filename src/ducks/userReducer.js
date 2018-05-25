const initialState = {
    email: '',
    firstname: '',
    lastname: '',
    profilepicture: '',
    role: '',
    employeeid: ''
}

const SET_USER = 'SET_USER';

export function setUser(data){
    return {
        type: SET_USER,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return Object.assign({}, state, action.payload)

        default:
            return state;
    }
}