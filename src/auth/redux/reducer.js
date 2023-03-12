import {
    LOGIN,
    LOGOUT,
    UPDATE_AVATAR,
    ADD_NOTIFICATION,
    GET_NOTIFICATION,
    ADD_TOAST,
    DELETE_TOAST,
    CHANGE_THEME,
} from './actions';

const DEFAULT_STATE = {
    isAuthenticated: !!localStorage.getItem('accessToken') || false,
    user: JSON.parse(localStorage.getItem('user_info')) || {},
    notifications: [],
    toasts: [],
    theme: localStorage.getItem('theme') || 'light',
};

export const reducer = (state = DEFAULT_STATE, action) => {
    // console.log(action);
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                user: action.user,
            };

        case UPDATE_AVATAR:
            return {
                ...state,
                user: action.user,
            };

        case LOGOUT:
            return {
                // turn an empty object into false or an object with keys to be true
                isAuthenticated: false,
                user: {},
            };

        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.notification],
            };

        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications,
            };

        case ADD_TOAST:
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
            };
        case DELETE_TOAST:
            return {
                ...state,
                toasts: [],
            };

        case CHANGE_THEME:
            localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light');

            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };

        default:
            return state;
    }
};
