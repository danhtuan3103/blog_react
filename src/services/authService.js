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

export const signin = async ({ token }) => {
    try {
        const res = await request.post('/user/signin/gg', { token });

        return res.data;
    } catch (error) {
        handleError(error);
        console.log(error);
    }
};

export const signup = async ({ token }) => {
    try {
        const res = await request.post('/user/signup/gg', { token });

        return res.data;
    } catch (error) {
        handleError(error);
        console.log(error);
    }
};

export const fbSignup = async ({ data }) => {
    try {
        const res = await request.post('/user/signup/fb', data);
        return res.data;
    } catch (error) {
        handleError(error);
        console.log(error);
    }
};

export const fbSignin = async ({ data }) => {
    try {
        const res = await request.post('/user/signin/fb', data);

        return res.data;
    } catch (error) {
        handleError(error);
        console.log(error);
    }
};

export const uploadAvatar = async ({ avatar }) => {
    const customConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    console.log(avatar);
    try {
        const res = await request.put('/user/avatar/upload', avatar, customConfig);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAvatar = async ({ avatar }) => {
    try {
        const res = await request.put('/user/avatar/update', { avatar });
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
