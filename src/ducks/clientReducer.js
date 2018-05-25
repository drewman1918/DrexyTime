const initialState = {
    clients: [],
    client1Projects: []
}

const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
const GET_CLIENT_PROJECTS1 = 'GET_CLIENT_PROJECTS1';

export function getAllClients(data){
    return{
        type: GET_ALL_CLIENTS,
        payload: data
    }
}

export function getClientProjects(data){
    return{
        type: GET_CLIENT_PROJECTS1,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_CLIENTS:
            return Object.assign({}, state, {clients: action.payload})

        case GET_CLIENT_PROJECTS1:
            return Object.assign({}, state, {client1Projects: action.payload})

        default:
            return state;
    }
}