import * as request from '~/utils/httpRequest';
// import handleError from '~/utils/handleError';
export const getBlogs = async ({ topic, page }) => {
    try {
        const res = await request.get(`/blog/?topic=${topic}&page=${page}&limit=${5}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBlog = async ({ id }) => {
    try {
        const res = await request.get(`/blog/${id}`);
        return res.data;
    } catch (error) {
        alert('Không tìm thấy nội dung');
        window.location.href = '/search';
    }
};

export const suggestBlogs = async ({ topic, author }) => {
    try {
        const res = await request.post(`/blog/suggestion`, { topic, author });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createBlog = async ({ data }) => {
    try {
        const res = await request.post(`/blog/create`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
