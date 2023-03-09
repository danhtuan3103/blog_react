import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import BottomHead from './BottomHead';
import Notification from '../Notification';
import { IoMdNotifications } from 'react-icons/io';
import { Menu } from '../Menu';
import { logout } from '~/auth/redux/actions';
import instance from '~/config/axiosConfig';
const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const { notifications, isAuthenticated, user } = useSelector((state) => state);

    const nonReaded = notifications.filter((noti) => {
        const isReaded = noti.read_by.some((reader) => reader.readerId === user._id);
        if (!isReaded) {
            return noti;
        }
    });

    const [visible, setVisible] = useState(false);
    const ref = useRef();

    // console.log(notifications);
    const handeLogout = async () => {
        instance
            .post('/user/logout')
            .then((response) => {
                dispatch(logout());
                window.location.href = '/login';
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const MENU = [
        {
            title: 'Trang cá nhân',
            to: `/profile/${user?._id}`,
            separate: true,
        },
        {
            title: 'Feedback and help',
            to: '/feedback',
            separate: true,
        },
        {
            title: 'Sub Menu',
            children: {
                title: 'Sub Menu',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Vietnamese',
                    },
                ],
            },
        },
        {
            title: 'Bài viết đã lưu',
            to: '/store/posts',
        },
        {
            title: 'Logout',
            fn: handeLogout,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('left-side')}>
                <Link to="/" className={cx('logo')}>
                    Blog
                </Link>
                <NavLink className={({ isActive }) => (isActive ? cx('active', 'link') : cx('link'))} to="/">
                    Trang chủ
                </NavLink>

                <NavLink className={({ isActive }) => (isActive ? cx('active', 'link') : cx('link'))} to="/search">
                    Tìm kiếm  
                </NavLink>
                <Button className={cx('btn')} to="/blog/write" primary>
                    Viết blog
                </Button>
            </div>

            {isAuthenticated ? (
                <div className={cx('login-side')}>
                    <Notification>
                        <span
                            className={cx('noti-icon')}
                            ref={ref}
                            data-noti={nonReaded.length || 0}
                            data-active={nonReaded.length > 0}
                        >
                            <IoMdNotifications className={cx('icon')} />
                        </span>
                    </Notification>
                    <Menu items={MENU} hideOnClick={true} visible={visible} setVisible={setVisible}>
                        <Image
                            onClick={() => setVisible(!visible)}
                            className={cx('avatar')}
                            src={user.avatar}
                            alt={user.username}
                            fallBack={images.fallbackAvatar}
                        />
                    </Menu>
                </div>
            ) : (
                <div className={cx('right-side')}>
                    <Button text to="/login" className={cx('btn')}>
                        Đăng nhập
                    </Button>
                    <Button yellow to="/register" className={cx('btn')}>
                        Đăng kí
                    </Button>
                </div>
            )}

            {/* Bottom nav */}

            <BottomHead menu={MENU} />
        </header>
    );
}

export default Header;
