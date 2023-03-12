import * as request from '~/utils/httpRequest';

export const checkLike = async ({ id }) => {
    try {
        const res = await request.get(`/blog/like/check/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const likeBlog = async ({ blog_id }) => {
    try {
        const res = await request.post('/blog/like', { blog_id });
        return res.data;
    } catch (error) {}
};
