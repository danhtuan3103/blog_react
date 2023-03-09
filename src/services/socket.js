import { io } from 'socket.io-client';
import { addNotifications } from '~/auth/redux/actions';

let socket;
const token = JSON.parse(localStorage.getItem('accessToken'));

export const initiateSocketConnection = () => {
    socket = io.connect(process.env.REACT_APP_API_URL, { transports: ['websocket'], query: { token } });
    console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
};

export const pingSocket = () => {
    if (socket) socket.emit('ping');
};

export const listenSocket = (dispatch) => {
    if (socket)
        socket.on('emit_notis', (data) => {
            console.log(data.data);
            dispatch(addNotifications(data.data));
        });
};

export const sendNotification = ({ user_id, notification }) => {
    if (socket) socket.emit('send_noti', { user_id: user_id, notification: notification });
};
