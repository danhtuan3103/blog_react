import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './SearchDetail.module.scss';
import Image from '~/components/Image';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${user._id}`);
    };
    return (
        <div className={cx('card2')} onClick={handleClick}>
            <Image className={cx('img')} src={user?.avatar} fallBack={images.fallbackAvatar}></Image>

            <div className={cx('info')}>
                <span className={cx('name')}>{user?.username}</span>
                <span className={cx('aka')}>{user?.email}</span>
            </div>
        </div>
    );
};

export default memo(UserCard);
