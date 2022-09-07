const initialState = {
    currentUser: null
};
export const user = (state = initialState, action) => {
    return {
        ...initialState,
        currentUser: action.currentUser
    };
};
