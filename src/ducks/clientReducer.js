const initialState = {
    clients: [],
    client1Projects: [],
    client2Projects: [],
    client3Projects: []
}

const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
const GET_CLIENT_PROJECTS1 = 'GET_CLIENT_PROJECTS1';
const GET_CLIENT_PROJECTS2 = 'GET_CLIENT_PROJECTS2';
const GET_CLIENT_PROJECTS3 = 'GET_CLIENT_PROJECTS3';

export function getAllClients(data){
    return{
        type: GET_ALL_CLIENTS,
        payload: data
    }
}

export function getClientProjects1(data){
    return{
        type: GET_CLIENT_PROJECTS1,
        payload: data
    }
}

export function getClientProjects2(data){
    return{
        type: GET_CLIENT_PROJECTS2,
        payload: data
    }
}

export function getClientProjects3(data){
    return{
        type: GET_CLIENT_PROJECTS3,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_CLIENTS:
            return Object.assign({}, state, {clients: action.payload})

        case GET_CLIENT_PROJECTS1:
            return Object.assign({}, state, {client1Projects: action.payload})

        case GET_CLIENT_PROJECTS2:
            return Object.assign({}, state, {client2Projects: action.payload})

        case GET_CLIENT_PROJECTS3:
            return Object.assign({}, state, {client3Projects: action.payload})

        default:
            return state;
    }
}