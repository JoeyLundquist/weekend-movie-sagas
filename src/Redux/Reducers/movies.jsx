// Used to store movies returned from the server
export default function movies (state = [], action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
