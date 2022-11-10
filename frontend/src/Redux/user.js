import * as ActionTypes from './actionTypes';
const userKey="currentUser";
// try getting current user from session storage
// if not found (null) set it an empty record
export const User = (state = sessionStorage.getItem(userKey)==null?{
        id: null,
        username: '',
        breweryId: 0,
        authorities: []
    }:JSON.parse(sessionStorage.getItem(userKey)), action) => {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            // save user to session storage
            sessionStorage.setItem(userKey, JSON.stringify(action.payload));
            return { ...state, id: action.payload.id, username: action.payload.username, breweryId: action.payload.breweryId, authorities: action.payload.authorities }
        
        case ActionTypes.DELETE_USER:
            // remove user from session storage
            sessionStorage.removeItem(userKey);
            return { ...state, id: null, username: '', authorities: [] }

        default:
            return state;
    }
}