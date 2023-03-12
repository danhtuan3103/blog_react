export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const ADD_TOAST = 'ADD_TOAST';
export const DELETE_TOAST = 'DELETE_TOAST';
export const CHANGE_THEME = 'CHANGE_THEME';

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user_info');
    return {
        type: LOGOUT,
    };
}

export function login(payload) {
    localStorage.setItem('accessToken', JSON.stringify(payload.accessToken || ''));
    localStorage.setItem('refreshToken', JSON.stringify(payload.refreshToken || ''));
    localStorage.setItem('user_info', JSON.stringify(payload.data || {}));

    return {
        type: LOGIN,
        user: payload.data,
    };
}

export function updateAvatar(payload) {
    localStorage.setItem('user_info', JSON.stringify(payload));

    return {
        type: UPDATE_AVATAR,
        user: payload,
    };
}

export const addNotifications = (payload) => {
    return {
        type: 'ADD_NOTIFICATION',
        notification: payload,
    };
};

export const getNotifications = (payload) => {
    return {
        type: 'GET_NOTIFICATION',
        notifications: payload,
    };
};

export const addToast = (payload) => {
    return {
        type: 'ADD_TOAST',
        toast: payload,
    };
};

export const deleteToast = () => {
    return {
        type: 'DELETE_TOAST',
    };
};

export const changeTheme = () => {
    return {
        type: 'CHANGE_THEME',
    };
};
