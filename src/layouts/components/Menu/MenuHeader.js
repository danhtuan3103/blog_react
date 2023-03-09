import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Menu.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function MenuHeader({ title, avatar, name, aka }) {
    return (
        <header className={cx('menu-header')}>
            <Image className={cx('avatar')} src={avatar} alt={name} fallBack={images.fallbackAvatar} />
            <div className={cx('name-box')}>
                <span className={cx('name')}>{name}</span>
                <span className={cx('aka')}>{aka}</span>
            </div>

            {/* <div className={cx('menu-body')}></div> */}
        </header>
    );
}

export default MenuHeader;
