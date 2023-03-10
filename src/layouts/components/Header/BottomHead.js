import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';
import images from '~/assets/images';
import Image from '~/components/Image';
import Overlay from '~/components/Overlay/Overlay';
import MenuItem from '../Menu/MenuItem';
import { RiSearch2Fill, RiLoginCircleFill } from 'react-icons/ri';
import { IoMdNotifications } from 'react-icons/io';
import Notification from '../Notification';

import { useEffect, useMemo, useRef, useState } from 'react';
import SubHeader from '../Menu/SubHeader';
const cx = classNames.bind(styles);

function BottomHead({ menu, nonReaded }) {
    const [history, setHistory] = useState([{ data: menu }]);
    const currentItems = history[history.length - 1];
    const { isAuthenticated, user } = useSelector((state) => state);
    const [openMenu, setOpenMenu] = useState(false);
    const [visibleNoti, setVisibleNoti] = useState(false);
    const ref = useRef();

    useEffect(() => {
        setHistory([{ data: menu }]);
    }, [menu]);

    const renderItems = () => {
        return currentItems.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    className={cx('item')}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else if (!!item.fn) {
                            const fn = item.fn;
                            fn();
                        } else {
                            // onchange(item)
                            setOpenMenu(false);
                        }
                    }}
                ></MenuItem>
            );
        });
    };

    const handleBack = () => {
        setHistory((pre) => pre.slice(0, history.length - 1));
    };

    return (
        <div className={cx('bottom-side')}>
            {!isAuthenticated ? (
                <NavLink
                    className={({ isActive }) => (isActive ? cx('active', 'icon-block') : cx('icon-block'))}
                    to="/login"
                >
                    <RiLoginCircleFill className={cx('icon')} />
                </NavLink>
            ) : (
                <a className={cx('icon-block')} onClick={() => setOpenMenu(true)}>
                    <Image
                        className={cx('bottomSide-avatar')}
                        src={user?.avatar}
                        alt={user?.username}
                        fallBack={images.fallbackAvatar}
                    />
                </a>
            )}
            <Notification visible={visibleNoti} setVisible={setVisibleNoti} mobile={true}>
                <span
                    className={cx('noti-icon', 'icon-block')}
                    onClick={() => setVisibleNoti(true)}
                    ref={ref}
                    data-noti={nonReaded?.length || 0}
                    data-active={nonReaded?.length > 0}
                >
                    <IoMdNotifications className={cx('icon')} />
                </span>
            </Notification>

            <NavLink
                to="/blog/write"
                className={({ isActive }) => (isActive ? cx('active', 'icon-block') : cx('icon-block'))}
            >
                <AiFillPlusCircle className={cx('icon')} />
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? cx('active', 'icon-block') : cx('icon-block'))}
                to="/search"
            >
                <RiSearch2Fill className={cx('icon')} />
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? cx('active', 'icon-block') : cx('icon-block'))} to="/">
                <AiFillHome className={cx('icon')} />
            </NavLink>

            {openMenu && (
                <Overlay onClose={() => setOpenMenu(false)}>
                    <div className={cx('mob-menu')} onClick={(e) => e.stopPropagation()}>
                        <header className={cx('menu-header')}>
                            <Image
                                className={cx('avatar')}
                                src={user?.avatar}
                                alt={user?.username}
                                fallBack={images.fallbackAvatar}
                            />
                            <div className={cx('name-box')}>
                                <span className={cx('name')}>{user?.username}</span>
                                <span className={cx('aka')}>{user?.email}</span>
                            </div>
                        </header>

                        {history.length > 1 && <SubHeader title={currentItems.title} onBack={handleBack} />}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </div>
                </Overlay>
            )}
        </div>
    );
}

export default BottomHead;
