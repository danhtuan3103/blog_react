import handleError from '~/utils/handleError';
import * as request from '~/utils/httpRequest';

export const login = async ({ data }) => {
    try {
        const res = await request.post('/user/login', data);
        return res.data;
    } catch (error) {
        handleError(error);
        console.log(error);
    }
};

export const logout = async () => {
    try {
        const res = await request.post('/user/logout');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async ({ data }) => {
    try {
        const res = await request.post('/user/register', data);
        return res.data;
    } catch (error) {
        handleError(error);

        console.log(error);
    }
};

export const updateAvatar = async ({ avatar }) => {
    try {
        const res = await request.post('/user/avatar', { avatar });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInfo = async ({ id }) => {
    try {
        const res = await request.get(`/user/${id}`);
        return res.data;
    } catch (error) {
        alert('Không tìm thấy nội dung');
        window.location.href = '/search';
        console.log(error);
    }
};
