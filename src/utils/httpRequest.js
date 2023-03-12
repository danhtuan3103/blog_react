import request from '~/config/axiosConfig';

export const get = async (path, options = {}) => {
    const reponse = await request.get(path, options);
    return reponse.data;
};

export const post = async (path, options = {}) => {
    const reponse = await request.post(path, options);
    return reponse.data;
};

export const put = async (path, options = {}) => {
    const reponse = await request.put(path, options);
    return reponse.data;
};

export const patch = async (path, options = {}) => {
    const reponse = await request.patch(path, options);
    return reponse.data;
};

export default request;
