import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Wrapper from '~/components/Wrapper';
import NotiHeader from './NotiHeader';
import NotiItem from './NotiItem';
import images from '~/assets/images';
import { timeCaculate } from '~/helper';
import { getNotifications } from '~/auth/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import getTypeNotifiication from '~/helper/getTypeNotification';
import instance from '~/config/axiosConfig';
import { sortByDate } from '~/helper/sortByDate';
const cx = classNames.bind(styles);

function Notification({ children }) {
    const { notifications, user } = useSelector((state) => state);
    // console.log(notifications);

    const dispatch = useDispatch();

    const renderItems = () => {
        // console.log('re-render');
        const sortNoti = sortByDate(notifications);

        return sortNoti.map((key, index) => {
            const isReaded = key?.read_by.some((reader) => reader.readerId === user._id);
            // console.log(isReaded);
            return (
                <NotiItem
                    key={index}
                    itemId={key._id}
                    readed={isReaded}
                    sender={key.sender}
                    type={getTypeNotifiication(key.type)}
                    blog={key.target}
                    date={timeCaculate(key?.createdAt)}
                    message={key.message}
                />
            );
        });
    };

    const handleReadAll = () => {
        instance
            .get('/notifications/readed')
            .then((res) => {
                const data = res.data.data;
                if (data) {
                    dispatch(getNotifications(data));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const renderResult = (attr) => {
        return (
            <div className={cx('noti-list')} tabIndex="-1" {...attr}>
                <Wrapper>
                    <NotiHeader onClick={handleReadAll} />
                    <div className={cx('noti-body')}>{renderItems()} </div>
                </Wrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive={true}
                placement="bottom-end"
                render={renderResult}
                delay={[0, 700]}
                hideOnClick={true}
                trigger={'click'}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Notification;
