import * as request from '~/utils/httpRequest';

export const getNotifications = async () => {
    try {
        const res = await request.get(`/notifications`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getActivitys = async ({ id }) => {
    try {
        const res = await request.get(`/notifications/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
