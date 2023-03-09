import instance from '~/config/axiosConfig';

const fetchNotifications = async () => {
    try {
        const { _id: user_id } = JSON.parse(localStorage.getItem('user_info'));
        const res = await instance.get(`/notifications`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default fetchNotifications;
