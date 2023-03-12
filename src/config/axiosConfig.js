import axios from 'axios';

const instance = axios.create({
    // .. where we make our configurations
    baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function refreshTokenFn() {
    const token = await instance.getLocalRefreshToken();

    return (await instance.post('/user/refresh-token', { refreshToken: token })).data;
}

instance.interceptors.request.use(
    async (config) => {
        if (
            config.url.indexOf('/user/login') >= 0 ||
            config.url.indexOf('/user/refresh-token') >= 0 ||
            config.url.indexOf('/user/register') >= 0
        ) {
            return config;
        }

        const token = await instance.getLocalAccessToken();
        config.headers.common['authorization'] = 'Bearer ' + token;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

instance.interceptors.response.use(
    async (res) => {
        const config = res.config;
        if (config.url.indexOf('user/login') >= 0 || config.url.indexOf('user/refresh-token') >= 0) {
            return res;
        }

        const { code, message } = res.data;

        if (code && code === 401) {
            if (message && message === 'jwt expired') {
                // console.log('Truong hop token het han');

                const { accessToken, refreshToken } = await refreshTokenFn();
                // console.log(accessToken, refreshToken);
                if (accessToken && refreshToken) {
                    // console.log('Set new Token');
                    config.headers['authorization'] = 'Bearer ' + accessToken;

                    await instance.setLocalAccessToken({ accessToken });
                    await instance.setLocalRefreshToken({ refreshToken });

                    return instance(config);
                }
            }
        }
        return res;
    },
    async (err) => {
        // window.location.href = '/login';

        return Promise.reject(err);
    },
);

instance.setLocalAccessToken = async ({ accessToken }) => {
    window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
};

instance.getLocalAccessToken = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (!accessToken) {
        return null;
    }
    return JSON.parse(accessToken);
};

instance.setLocalRefreshToken = async ({ refreshToken }) => {
    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
};

instance.getLocalRefreshToken = async () => {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (!refreshToken) {
        return null;
    }
    return JSON.parse(refreshToken);
};

export default instance;
