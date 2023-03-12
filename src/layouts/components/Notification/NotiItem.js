import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import instance from '~/config/axiosConfig';
import { useDispatch } from 'react-redux';
import { getNotifications } from '~/auth/redux/actions';
import { memo, useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function NotiItem({ title, date, sender, type, blog, message, className, itemId, readed, onClose }) {
    const navigate = useNavigate();
    const [isReaded, setIsReaded] = useState(readed);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsReaded(readed);
    }, [readed]);

    const handleReaded = () => {
        instance
            .get(`/notifications/readed/${itemId}`)
            .then((res) => {
                const data = res.data.data;
                dispatch(getNotifications(data));
                setIsReaded(true);
            })
            .catch((err) => console.error(err));
    };
    const handleClickUser = (id) => {
        navigate(`/profile/${id}`);
        onClose();
        if (!isReaded) {
            handleReaded();
        }
    };

    const handleClickBlog = (id) => {
        navigate(`/blog/${id}`);
        onClose();
        if (!isReaded) {
            handleReaded();
        }
    };

    const classes = cx('item', { readed: isReaded });
    return (
        <div className={classes}>
            <Image
                className={cx('avatar')}
                src={sender?.avatar}
                alt={title}
                fallBack={images.fallbackAvatar}
                onClick={() => handleClickUser(sender?._id)}
            />
            <div className={cx('content')}>
                <p className={cx('text')}>
                    <strong className={cx('strong-text')} onClick={() => handleClickUser(sender?._id)}>
                        {sender?.username}
                    </strong>{' '}
                    đã
                    <span className={cx('action')}> {type} </span>
                    <strong className={cx('strong-text')} onClick={() => handleClickBlog(blog?._id)}>
                        {blog?.title}
                    </strong>
                </p>
                {message && <p className={cx('mess')}>{message}</p>}
                <i className={cx('date')}>{date}</i>
            </div>
        </div>
    );
}

export default memo(NotiItem);
