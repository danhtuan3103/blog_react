import * as request from '~/utils/httpRequest';

export const checkBookmark = async ({ blog_id }) => {
    try {
        const res = await request.get(`/bookmark/check/${blog_id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const bookmarkBlog = async ({ blog_id }) => {
    try {
        const res = await request.post(`/bookmark/${blog_id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteBookmark = async ({ blog_id }) => {
    try {
        const res = await request.patch(`/bookmark/${blog_id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllBookmark = async () => {
    try {
        const res = await request.get(`/bookmark`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
