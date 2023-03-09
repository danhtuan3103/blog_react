import instance from '~/config/axiosConfig';

const setHeaderAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export default setHeaderAuthToken;
