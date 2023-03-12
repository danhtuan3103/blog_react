import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Wrapper from '~/components/Wrapper';
import NotiHeader from './NotiHeader';
import NotiItem from './NotiItem';
import { timeCaculate, sortByDate } from '~/helper';
import { getNotifications } from '~/auth/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import getTypeNotifiication from '~/helper/getTypeNotification';
import instance from '~/config/axiosConfig';
import { memo, useCallback } from 'react';
const cx = classNames.bind(styles);

function Notification({ children, visible, setVisible }) {
    const { notifications, user } = useSelector((state) => state);
    // console.log(notifications);

    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        setVisible(false);
    }, []);
    const renderItems = () => {
        const sortNoti = sortByDate(notifications);

        return sortNoti?.map((key, index) => {
            const isReaded = key?.read_by.some((reader) => reader.readerId === user._id);
            // console.log(isReaded);
            return (
                <NotiItem
                    key={index}
                    itemId={key._id}
                    readed={isReaded}
                    sender={key.sender}
                    onClose={handleClose}
                    type={getTypeNotifiication(key.type)}
                    blog={key.target}
                    date={timeCaculate(key?.createdAt)}
                    message={key.message}
                />
            );
        });
    };

    const handleReadAll = useCallback(() => {
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
    }, []);

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
                visible={visible}
                interactive={true}
                onClickOutside={() => setVisible(false)}
                placement="bottom-end"
                render={renderResult}
                delay={[0, 700]}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default memo(Notification);
