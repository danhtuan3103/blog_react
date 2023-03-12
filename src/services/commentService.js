import * as request from '~/utils/httpRequest';
import handleError from '~/utils/handleError';

export const getCommentOfBlog = async ({ blog_id }) => {
    try {
        const res = await request.get(`/blog/comment/${blog_id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addComment = async ({ blog_id, comment }) => {
    try {
        const res = await request.post(`/blog/comment/${blog_id}`, comment);
        return res.data;
    } catch (error) {
        console.log(error);
        handleError(error);
    }
};
